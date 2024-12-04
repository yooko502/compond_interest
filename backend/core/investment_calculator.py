import numpy as np
from dataclasses import dataclass
import pandas as pd
import math
from typing import Literal, Dict, Optional


@dataclass
class InvestmentResult:
    """investment result dataclass"""
    final_balance: float
    total_principal: float
    total_return: float
    monthly_data: pd.DataFrame


def _validate_inputs(params: Dict) -> None:
    """Validate input parameters."""
    if params['y_return'] < -1:
        raise ValueError("Yearly return rate cannot be less than -100%")
    if params['horizon'] <= 0:
        raise ValueError("Investment horizon must be positive")
    if params['m_investment'] < 0:
        raise ValueError("Monthly investment cannot be negative")
    if params['init_balance'] < 0:
        raise ValueError("Initial balance cannot be negative")
    if params['method'] not in ["geometric", "arithmetic"]:
        raise ValueError("Method must be either 'geometric' or 'arithmetic'")
    if not isinstance(params['increment'], (int, float)):
        raise ValueError("Increment amount must be a number")
    if params['incre_period'] < 0:
        raise ValueError("Increment period cannot be negative")


class InvestmentCalculator:
    """
    A class to calculate the investment return and investment plan.

     Parameters:
        y_return (float): Yearly return rate (as decimal, e.g., 0.1 for 10%)
        horizon (int): Investment horizon in years
        m_investment (float): Monthly investment amount
        init_balance (float): Initial balance (default: monthly investment)
        method (str): Method to calculate monthly return - "geometric" or "arithmetic" (default: "geometric")
        increment (float): Annual increment to monthly investment. Defaults to 0.
        incre_period (int): Number of years to apply increment. Defaults to 0.
    """

    def __init__(self, y_return: float,
                 horizon: int,
                 m_investment: float,
                 init_balance: float = 0,
                 method: Literal["geometric", "arithmetic", "geo", "arith"] = "geometric",
                 increment: float = 0,
                 incre_period: int = 0):

        # Input validation
        _validate_inputs(locals())

        # Protected attributes in this class (suggest to use in subclasses and this class)
        self._y_return = y_return
        self._horizon = horizon
        self._m_investment = m_investment
        self._init_balance = m_investment if init_balance == 0 else init_balance
        self._method = method
        self._increment = increment
        self._increment_period = incre_period

        # Protected attributes to be used in this class only
        self.__monthly_return = self._calculate_monthly_return()

    @property
    def y_return(self) -> float:
        """yearly return rate"""
        return self._y_return

    @property
    def horizon(self) -> int:
        """investment horizon in years"""
        return self._horizon

    @property
    def m_investment(self) -> float:
        """monthly investment amount"""
        return self._m_investment

    @property
    def init_balance(self) -> float:
        """initial balance"""
        return self._init_balance

    def _calculate_monthly_return(self) -> float:
        """Calculate the monthly return of an expected yearly return."""
        if self._method == "geometric" or self._method == "geo":
            return pow(1 + self.y_return, 1 / 12) - 1
        elif self._method == "arithmetic" or self._method == "arith":
            return self.y_return / 12

    def automatic_investment(self) -> InvestmentResult:
        """
        Calculate the final balance with optional periodic investment increment.

        假设在每个月的月初进行定投，每月定投额为m_investment，年收益率为y_return，投资期为horizon年。
        因此，每个月月初的余额计算公式为：balance = balance * (1 + monthly_return) + m_investment
        这里，balance为上个月月初的余额，这一部分会享受一整个月的收益。

        是否增加定投额的判断
        1.是否经过了一年：(i+1) % 12 == 0
        2.增加定投额是否为0：increment != 0
        3.当前年限是否在增加定投额年限内：year_num <= incre_period
        4.判断是否为第一年，第一年不进行增加定投额的操作，增加定投额从第二年开始：year_num != 0

        Parameters:
            No parameters.

        Returns:
            float: Final balance after investment horizon.
        """

        """计算投资期数以及设置当前月投资额"""
        month_num = self.horizon * 12
        current_monthly_investment = self.m_investment

        """initial data array"""
        """第一个元素为初始值，后续元素开始依次为投资一个月，两个月，三个月……时的月初时候的数值"""
        balances = np.zeros(month_num+1)  # 账户余额
        principals = np.zeros(month_num+1)  # 投入本金
        returns = np.zeros(month_num+1)  # 投资收益

        """setting initial value"""
        """初始余额设置为0的情况下，会默认为每月定投额"""
        balances[0] = self.init_balance
        principals[0] = self.init_balance

        for i in range(month_num):
            year_num = i // 12

            # Apply increment to monthly investment or not
            if (i + 1) % 12 == 0 and self._increment != 0 and \
                    year_num <= self._increment_period and year_num != 0:
                current_monthly_investment += self._increment

            balances[i+1] = (balances[i] * (1 + self.__monthly_return) +
                             current_monthly_investment)
            principals[i+1] = principals[i] + current_monthly_investment
            returns[i+1] = balances[i+1] - principals[i+1]

        """Create monthly data"""
        dates = pd.date_range(
            start=pd.Timestamp.now().to_period("M").to_timestamp(),
            periods=month_num+1,
            freq='ME'
        )

        monthly_data = pd.DataFrame({
            "Date": dates,
            "Principal": principals,
            "Return": returns,
            "Balance": balances
        })

        return InvestmentResult(
            final_balance=float(balances[-1]),
            total_principal=float(principals[-1]),
            total_return=float(returns[-1]),
            monthly_data=monthly_data
        )

    def back_to_present(self,
                        target: Literal["num", "rate"],
                        value_target: float) -> float | np.ndarray:
        """
        Calculate either required monthly investment or required monthly return
        to reach a target value.

        Parameters:
            target (str): "num" for monthly investment or "rate" for required return
            value_target (float): Target final balance

        Returns:
            float: Required monthly investment or monthly return rate
        """
        if value_target <= 0:
            raise ValueError("Target value must be positive")

        month_num = self.horizon * 12

        if target == "num":
            # Calculate required monthly investment
            numerator = (value_target - self.init_balance * pow(1 + self.__monthly_return, month_num))
            denominator = (pow(1 + self.__monthly_return, month_num) - 1) / self.__monthly_return
            return numerator / denominator

        elif target == "rate":
            # Calculate required monthly return rate using numerical method
            from scipy.optimize import fsolve

            def objective(r):
                # Objective function to solve for monthly return,
                # r represents monthly return rate is a variable of the equation.
                balance = self.init_balance + self.m_investment
                for _ in range(month_num):
                    balance = balance * (1 + r) + self.m_investment
                return balance - value_target

            result = fsolve(objective, x0=0.01)[0]  # Use 1% as initial guess
            return result


if __name__ == "__main__":
    # 使用示例
    try:
        # 创建计算器实例：10%年收益率，5年投资期，每月投资1000元
        calc = InvestmentCalculator(
            y_return=0.10,  # 10% 年收益率
            horizon=5,  # 5年投资期
            m_investment=1000,  # 每月投资1000元
            init_balance=0,  # 初始余额0元
            method="geometric",  # 使用几何平均值计算月收益率
        )

        # 计算最终余额
        final_result = calc.automatic_investment()

        # 计算达到目标所需的每月投资额
        target_value = 100000
        required_monthly = calc.back_to_present("num", target_value)
        print(f"Required monthly investment to reach {target_value} "
              f"with {calc.y_return} yearly return "
              f"and {calc.init_balance} initial balance : {required_monthly:.2f}")

        # 计算达到目标所需的月收益率
        required_return = calc.back_to_present("rate", target_value)
        print(f"Reaching the {target_value} target with {calc.m_investment} monthly investment, "
              f"required monthly return rate: {required_return:.4%}")

    except ValueError as e:
        print(f"Error: {e}")
