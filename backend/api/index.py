# api/index.py
from backend.core.investment_calculator import InvestmentCalculator
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/final_balance", methods=["POST"])
def get_final_balance():
    calc = InvestmentCalculator(
        y_return=0.10,  # 10% 年收益率
        horizon=5,  # 5年投资期
        m_investment=1000,  # 每月投资1000元
        init_balance=0,  # 初始余额0元
        method="geometric"  # 使用几何平均计算月收益率
    )
    final_balance = calc.automatic_investment()
    return jsonify({"final_balance": final_balance})
