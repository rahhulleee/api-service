# backend/user_app.py

from flask import Blueprint, request, jsonify
import bcrypt
import uuid

# Function to create routes with access to the `mysql` instance
def create_user_routes(mysql):
    user_routes = Blueprint('user_routes', __name__)

    # Route for user registration
    @user_routes.route('/register', methods=['POST'])
    def register():
        email = request.json.get('email')
        password = request.json.get('password')

        # Generate a UUID for the new user
        user_id = str(uuid.uuid4())

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insert the new user into the database
        cursor = mysql.connection.cursor()
        cursor.execute(
            "INSERT INTO User (id, email, password) VALUES (%s, %s, %s)", 
            (user_id, email, hashed_password)
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({'message': 'User registered successfully!', 'user_id': user_id}), 201

    # Route for user login
    @user_routes.route('/login', methods=['POST'])
    def login():
        email = request.json.get('email')
        password = request.json.get('password')

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM User WHERE email = %s", [email])
        user = cursor.fetchone()
        cursor.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'message': 'Login successful!'}), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    
    # Route to get all users
    @user_routes.route('/users', methods=['GET'])
    def get_users():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, email FROM User")
        users = cursor.fetchall()
        cursor.close()
        return jsonify(users), 200

    return user_routes  # Return the blueprint
