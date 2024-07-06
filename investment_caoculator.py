import numpy as np
import pandas as pd
import math


def monthly_rate(yearly_rate: float):
    """
  Calculate the monthly return of an expected yearly return.
  """
    return pow(1 + yearly_rate, 1 / 12) - 1


def automatic_investment(return_monthly: float, investment_monthly: float, horizon: int, initial_balance: float = 0):
    """
    Calculate the balance after a certain period of time with a certain monthly investment and monthly return.
    suppose the investment is made at the start of each month.

    initial_balance: default 0.

    """
    month_num = horizon * 12
    balance = initial_balance + investment_monthly

    for i in range(month_num):
        balance = balance * (1 + return_monthly) + investment_monthly

    return balance


def back_to_present(target: str, target_value: float, return_monthly: float, horizon: float,
                    investment_monthly: float = 0, initial: float = 0):
    """
    Calculate the monthly investment value or expected monthly return.
    suppose the investment is made at the start of each month.

    """
    # 要求return_monthly or investment monthly
    month_num = horizon * 12

    if target == "num":
        monthly_num = (target_value - initial * pow(1 + return_monthly, month_num)) * \
                      return_monthly / (pow(1 + return_monthly, month_num - 1) - 1)
        return monthly_num

    elif target == "rate":
        pass

    else:
        raise ValueError("target should be either 'num' or 'rate'")


if __name__ == "__main__":
    yearly_return = 0.20
    investment_horizon = 20
    monthly_investment = 10
    initial_balance = 0

    total_balance = automatic_investment(monthly_rate(yearly_return),
                                         monthly_investment,
                                         investment_horizon)

    total_gain = total_balance - investment_horizon * 12 * monthly_investment

    print(
        f"经过20年的总余额是： "
        f"{total_balance:.2f} \n \
    共盈利 "
        f"{total_gain:.2f}")

    # 月投资额

    monthly_investment = back_to_present("num",
                                         1000000,
                                         monthly_rate(yearly_return),
                                         investment_horizon)

    print(f"每月投资额为：{monthly_investment:.2f}")