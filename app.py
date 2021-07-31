import time
from flask import Flask
import json
  
app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/stocks')
def get_stocks():
    # Opening JSON file
    f = open('stocks.json',)
      
    # returns JSON object as 
    # a dictionary
    data = json.load(f)
    f.close()

    return data; 

if __name__ == '__main__':
    app.run(port=5000, debug=True)
