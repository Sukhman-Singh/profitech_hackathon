import time
from flask import Flask, jsonify, request, Response, flash
import fin_vis as fv

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/stocks', methods=['GET','POST'])
def get_stock_list():
    if request.method == 'GET':
        income = request.args.get('income', default=100000, type=int)
        investment_amount = request.args.get('investment_amount', default=50000, type=int)
        num_stocks = 100

        stock_list = fv.get_stock_list(income=income, investment_amount=investment_amount, num_stocks=num_stocks)
        return jsonify(stock_list)
    return jsonify([])
        

if __name__ == '__main__':
    app.run(port=5000, debug=True)
