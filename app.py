import time
from flask import Flask, jsonify, request, Response, flash
from fin_vis import get_stock_list

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/stocks', methods=['GET'])
def get_stock_list():
    income = int(request.args.get('income'))
    investment_amount = int(request.args.get('investment_amount'))
    num_stocks = 100

    stock_list = get_stock_list(income=income, investment_amount=investment_amount, num_stocks=num_stocks)
    return jsonify(stock_list)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
