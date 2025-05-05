import psycopg2, os, queries
from dotenv import load_dotenv


load_dotenv()


def db_connect():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME"))


def verify_user_and_password(user_code, user_password):
    conn = db_connect()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(queries.SQL_VERIFY_USER_AND_PASSWORD, (user_code, user_password))
    user = cursor.fetchone()
    conn.close()
    return user