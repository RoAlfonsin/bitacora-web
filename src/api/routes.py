"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()
        users = list(map(lambda x: x.serialize(), users))
        return jsonify(users), 200
    if request.method == 'POST':
        from app import bcrypt
        body = request.get_json()
        check_user = User.query.filter_by(email=body['email']).first()
        if check_user:
            return jsonify({"msg": "User already exists"}), 400
        password_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
        user = User(email=body['email'], password=password_hash, is_verified=False)
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize()), 200
    
@api.route('/users/login', methods=['POST'])
def handle_login():
    from app import bcrypt
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    if user and bcrypt.check_password_hash(user.password, body['password']):
        return jsonify(user.serialize()), 200
    return jsonify({"msg": "Invalid email or password"}), 400