from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import db_procedures
import os, jwt


load_dotenv()


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, origins="http://localhost:3000", supports_credentials=True)


@app.route('/db-procedures/login', methods=['POST'])
def user_and_password():
    data = request.json
    user_code = data.get('user_code')
    user_password = data.get('user_password')

    if user_code and user_password:
        is_ok = db_procedures.verify_login(user_code, user_password)
        if is_ok:
            token = jwt.encode({'user': user_code, 'exp': datetime.now() + timedelta(hours=1)},
                               app.config['SECRET_KEY'], algorithm='HS256')
            response = jsonify({'message': 'Login Successfully!'})
            response.set_cookie('token', token, httponly=True, samesite='Lax')

            return response
        return jsonify({'message': 'Login failed!'}), 401
    return jsonify({'message': 'Missing required fields!'}), 401


@app.route('/db-procedures/branches', methods=['POST'])
def get_branches():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'message': 'Unnauthorized'}), 401
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        branches_list = db_procedures.list_branches(data['user'])
        return jsonify({'branches': branches_list})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Expired token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'message': 'Internal server error'}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)