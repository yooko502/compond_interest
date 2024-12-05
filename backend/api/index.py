# api/index.py
from flask_cors import CORS
from flask import Flask, json, jsonify, request

from backend.core.investment_calculator import InvestmentCalculator

app = Flask(__name__)
CORS(app)

PRESENT_METHOD = {
  "amount": "amount",
  "rate": "rate",
  "horizon": "horizon"
}
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

@app.route("/api/present_data", methods=["POST"])
def get_back_to_present():
    present_method = request.args.get("target")
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

    # 目標金額を達成するには
    # target_amount = 1000000
    if present_method == PRESENT_METHOD["amount"]:
        back_to_present = calc.back_to_present(present_method, target_amount)
    
    if present_method == PRESENT_METHOD["rate"]:
        # TODO: GET RATE DATA
        pass
    
    if present_method == PRESENT_METHOD["horizon"]:
        # TODO: GET HORIZON DATA
        pass

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