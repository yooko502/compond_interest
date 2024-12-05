# api/index.py
from flask_cors import CORS
from flask import Flask, json, jsonify, request

from backend.core.investment_calculator import InvestmentCalculator

app = Flask(__name__)
CORS(app)

@app.route("/api/final_balance", methods=["POST"])
def get_final_balance():
    json_data = request.get_json()
    year_return = float(json_data.get("year_return", 0)) / 100 # 年收益率
    monthly_reserve = float(json_data.get("monthly_reserve", 0)) # 每月投资额度
    initial_investment = float(json_data.get("initial_investment", 0))
    reserve_periods = int(json_data.get("reserve_periods", 0))
    increment = float(json_data.get("increment", 0))
    incre_period = int(json_data.get("incre_period", 0))

    calc = InvestmentCalculator(
        y_return=year_return,  # 10% 年收益率
        horizon=reserve_periods,  # 5年投资期
        m_investment=monthly_reserve,  # 每月投资1000元
        init_balance=initial_investment,  # 初始余额0元
        method="geometric",  # 使用几何平均值计算月收益率
        increment=increment,
        incre_period=incre_period
    )

    data = calc.automatic_investment()
    result = {
        "final_balance": data.final_balance,
        "total_principal": data.total_principal,
        "total_return": data.total_return,
        "monthly_data": json.loads(data.monthly_data.to_json(orient="records"))
    }

    response = jsonify({"result": result})
    return response

@app.route("/api/back_to_present_amount", methods=["POST"])
def get_back_to_present_amount():
    json_data = request.get_json()
    year_return = float(json_data.get("year_return", 0)) / 100 # 年收益率
    target_amount = float(json_data.get("target_amount", 0)) # 目标金额
    reserve_periods = int(json_data.get("reserve_periods", 0)) # 投资期间
    
    calc = InvestmentCalculator(
        y_return=year_return,  # 年收益率
        horizon=reserve_periods,  # 投资年份
        # m_investment=0,  # 每月投资1000元
        # init_balance=0,  # 初始余额0元
        method="geometric",  # 使用几何平均值计算月收益率
        # increment=0,
        # incre_period=0
    )

    # 目標金額を達成するには
    # target_amount = 1000000
    back_to_present = calc.back_to_present("amount", target_amount)

    # chart 用数据
    data = calc.automatic_investment(m_investment=back_to_present)
    result = {
        "final_balance": data.final_balance,
        "total_principal": data.total_principal,
        "total_return": data.total_return,
        "monthly_data": json.loads(data.monthly_data.to_json(orient="records"))
    }

    responese = jsonify({
        "chart_data": result,
        "back_to_present": back_to_present
    })

    return responese