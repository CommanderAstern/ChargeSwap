from flask import Flask
from flask_api import status
import os

app = Flask(__name__, static_folder='static')

app.config['UPLOAD_FOLDER'] = os.path.join('static', 'images')


@app.route('/')
def home():
  return "Welcome to ChargeSwap", status.HTTP_200_OK


from views import *

if __name__ == '__main__':
  app.run(host='0.0.0.0')
