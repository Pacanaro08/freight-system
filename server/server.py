from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import db_procedures
import os
import jwt


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
        user = db_procedures.verify_login(user_code, user_password)
        if user['valid'] == True:
            token = jwt.encode({
                'user': user_code,
                'exp': datetime.now(timezone.utc) + timedelta(hours=1)
            }, app.config['SECRET_KEY'], algorithm='HS256')

            response = jsonify({'message': 'Login Successfully!', 'code': 200})
            response.set_cookie('token', token, httponly=True, samesite='None', secure=True)

            return response
        return jsonify({'message': 'Login failed!', 'code': 401}), 401
    return jsonify({'message': 'Missing required fields!', 'code': 401}), 401


@app.route('/db-procedures/authenticate', methods=['POST'])
def authenticate_user():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'message': 'Unnauthorized', 'code': 401}), 401
    
    try:
        user = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user_code = user['user']
        
        data = request.json
        company_id = data.get('company_id')
        branch_id = data.get('branch_id')

        if not company_id and not branch_id:
            return jsonify({'message': 'Missing required fields', 'code': 400}), 400
        
        new_token = jwt.encode({
            'user': user_code,
            'company': company_id,
            'branch': branch_id,
            'exp': datetime.now(timezone.utc) + timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
            
        response = jsonify({'message': 'Success', 'code': 200})
        response.set_cookie('token', new_token, httponly=True, samesite='None', secure=True)

        return response
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Expired token', 'code': 401}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token', 'code': 401}), 401
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'message': 'Internal server error', 'code': 500}), 500
        

@app.route('/db-procedures/companies', methods=['GET'])
def get_companies():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'message': 'Unnauthorized', 'code': 401}), 401
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        companies_list = db_procedures.list_companies(data['user'])
        return jsonify({'message': 'Success', 'code': 200, 'companies': companies_list})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Expired token', 'code': 401}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token', 'code': 401}), 401
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'message': 'Internal server error', 'code': 500}), 500


@app.route('/db-procedures/branches', methods=['POST'])
def get_branches():
    data = request.json
    company_id = data.get('company_id')
    token = request.cookies.get('token')
    if not token:
        return jsonify({'message': 'Unnauthorized', 'code': 401}), 401
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        branches_list = db_procedures.list_branches(data['user'], company_id)
        return jsonify({'message': 'Success', 'code': 200, 'branches': branches_list})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Expired token', 'code': 401}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token', 'code': 401}), 401
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'message': 'Internal server error', 'code': 500}), 500


@app.route('/tokens/get-authenticated-tokens', methods=['GET'])
def get_tokens():
    token = request.cookies.get('token')
    if not token:
        return jsonify({'message': 'Unnauthorized', 'code': 401}), 401
    
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return jsonify({'message': 'Success', 'code': 200, 'user': data['user'], 'company': data['company'], 'branch': data['branch']})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Expired token', 'code': 401}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token', 'code': 401}), 401
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        return jsonify({'message': 'Internal server error', 'code': 500}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)