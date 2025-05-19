import psycopg2, os, queries, psycopg2.extras
from dotenv import load_dotenv


load_dotenv()


def db_connect():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME"))


def verify_login(user_code, user_password):
    conn = db_connect()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(queries.SQL_VERIFY_LOGIN, (user_code, user_password))
    user = cursor.fetchone()
    conn.close()
    return user


def list_companies(user_code):
    conn = db_connect()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(queries.SQL_LIST_USER_COMPANIES, (user_code,))
    list = cursor.fetchall()
    conn.close()
    return list


def list_branches(user_code, company_id):
    conn = db_connect()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute(queries.SQL_LIST_USER_BRANCHES, (user_code, company_id))
    list = cursor.fetchall()
    conn.close()
    return list