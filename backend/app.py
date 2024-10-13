# backend/app.py

from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

# Initialize the app
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'   # Replace with your MySQL user
app.config['MYSQL_PASSWORD'] = '9ge2dE95TsfLAf'  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'api_service'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Initialize MySQL
mysql = MySQL(app)

# Import routes from user_app
from user_app import create_user_routes
app.register_blueprint(create_user_routes(mysql))  # Pass mysql to user_app

if __name__ == '__main__':
    app.run(debug=True)
