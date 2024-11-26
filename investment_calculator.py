import numpy as np
import pandas as pd
import math
from typing import Literal


class InvestmentCalculator:
    """
    A class to calculate the investment return and investment plan.

     Parameters:
        y_return (float): Yearly return rate (as decimal, e.g., 0.1 for 10%)
        horizon (int): Investment horizon in years
        m_investment (float): Monthly investment amount
        init_balance (float): Initial balance (default: 0)
        method (str): Method to calculate monthly return - "geometric" or "arithmetic" (default: "geometric")
        increment (float): Annual increment to monthly investment. Defaults to 0.
        incre_period (int): Number of years to apply increment. Defaults to 0.
    """

    def __init__(self, y_return: float,
                 horizon: int,
                 m_investment: float,
                 init_balance: float = 0,
                 method: Literal["geometric", "arithmetic"] = "geometric",
                 increment: float = 0,
                 incre_period: int = 0):

        # Input validation
        if y_return < -1:
            raise ValueError("Yearly return rate cannot be less than -100%")
        if horizon <= 0:
            raise ValueError("Investment horizon must be positive")
        if m_investment < 0:
            raise ValueError("Monthly investment cannot be negative")
        if init_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        if method not in ["geometric", "arithmetic"]:
            raise ValueError("Method must be either 'geometric' or 'arithmetic'")
        if not isinstance(increment, (int, float)):
            raise ValueError("Increment amount must be a number")
        if incre_period < 0:
            raise ValueError("Increment period cannot be negative")

        self.__y_return = y_return
        self.__horizon = horizon
        self.__m_investment = m_investment
        self.__init_balance = init_balance
        self.__method = method
        self.__increment = increment
        self.__increment_period = incre_period

    @property
    def y_return(self) -> float:
        return self.__y_return

    @property
    def horizon(self) -> int:
        return self.__horizon

    @property
    def m_investment(self) -> float:
        return self.__m_investment

    @property
    def init_balance(self) -> float:
        return self.__init_balance

    @property
    def monthly_return(self) -> float:
        if self.__method == "geometric":
            return pow(1 + self.y_return, 1 / 12) - 1
        elif self.__method == "arithmetic":
            return self.y_return / 12

    def automatic_investment(self) -> float:
        """
        Calculate the final balance with optional periodic investment increment.

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
        month_num = self.horizon * 12
        balance = self.init_balance + self.m_investment
        current_monthly_investment = self.m_investment
        monthly_return = self.monthly_return

        for i in range(month_num):
            year_num = i // 12

            # Apply increment to monthly investment or not
            if (i + 1) % 12 == 0 and self.__increment != 0 and \
                    year_num <= self.__increment_period and year_num != 0:

                current_monthly_investment += self.__increment

            balance = balance * (1 + monthly_return) + current_monthly_investment

        return balance

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
            monthly_return = self.monthly_return
            numerator = (value_target - self.init_balance * pow(1 + monthly_return, month_num))
            denominator = (pow(1 + monthly_return, month_num) - 1) / monthly_return
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
            method="geometric"  # 使用几何平均计算月收益率
        )

        # 计算最终余额
        final_balance = calc.automatic_investment()
        print(f"Final balance: {final_balance:.2f}")

        # 计算达到目标所需的每月投资额
        target_value = 100000
        required_monthly = calc.back_to_present("num", target_value)
        print(f"Required monthly investment to reach {target_value}: {required_monthly:.2f}")

        # 计算达到目标所需的月收益率
        required_return = calc.back_to_present("rate", target_value)
        print(f"Required monthly return rate: {required_return:.4%}")

    except ValueError as e:
        print(f"Error: {e}")