from flask import Flask, jsonify, request
from flask_cors import CORS
import db_procedures


app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)


@app.route('/db-procedures/login', methods=['POST'])
def user_and_password():
    data = request.json
    user_code = data.get('user_code')
    user_password = data.get('user_password')
    is_ok = db_procedures.verify_login(user_code, user_password)
    return jsonify(is_ok)


if __name__ == "__main__":
    app.run(debug=True, port=8000)