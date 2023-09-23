"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import datetime, timedelta
from api.models import db, User, Package, Reservation
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

@api.route('/packages/<int:user_id>', methods=['POST', 'GET'])
def handle_packages(user_id):
    if request.method == 'GET':
        packages = Package.query.filter_by(user_id=user_id)
        packages = packages.order_by(Package.id)
        packages = list(map(lambda x: x.serialize(), packages))
        return jsonify(packages), 200
    if request.method == 'POST':
        body = request.get_json()
        package = Package(
            user_id=user_id,
            price=body['price'],
            total_sessions=body['totalSessions'],
            used_sessions=0,
            purchase_date=datetime.now(),
            expiration_date=datetime.now() + timedelta(days=body['packageDuration']),
            is_paid=False,
            is_active=True)
        db.session.add(package)
        db.session.commit()
        return jsonify(package.serialize()), 200

@api.route('/packages/<int:package_id>', methods=['PUT'])
def handle_package(package_id):
    if request.method == 'PUT':
        body = request.get_json()
        package = Package.query.get(package_id)
        package.used_sessions = body['usedSessions']
        package.is_paid = body['isPaid']
        package.is_active = body['isActive']
        db.session.commit()
        return jsonify(package.serialize()), 200

@api.route('/new-reservation', methods=['POST'])
def handle_new_reservation():
    if request.method == 'POST':
        body = request.get_json()
        # check if there is no package and create one
        if body['packageId'] == -1:
            package = Package(
                user_id=body['userId'],
                price=150,
                total_sessions=1,
                used_sessions=0,
                purchase_date=datetime.now(),
                expiration_date=datetime.now() + timedelta(days=1),
                is_paid=False,
                is_active=True)
            db.session.add(package)
            db.session.commit()
            body['packageId'] = package.id
        # remove session from package
        package = Package.query.get(body['packageId'])
        package.used_sessions += 1
        db.session.commit()
        reservation = Reservation(
            time_slot=body['timeSlot'],
            type=body['type'],
            date=body['date'],
            user_id=body['userId'],
            package_id=body['packageId'],
            patient_name=body['patientName'])
        db.session.add(reservation)
        db.session.commit()
        return jsonify(reservation.serialize()), 200
    
@api.route('/reservations/<int:user_id>', methods=['GET'])
def handle_reservations(user_id):
    if request.method == 'GET':
        reservations = Reservation.query.filter_by(user_id=user_id)
        reservations = reservations.order_by(Reservation.date, Reservation.time_slot)
        reservations = list(map(lambda x: x.serialize(), reservations))
        return jsonify(reservations), 200
    
@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def handle_delete_reservation(reservation_id):
    if request.method == 'DELETE':
        reservation = Reservation.query.get(reservation_id)
        #Restore session for deleted reservation
        package = Package.query.get(reservation.package_id)
        package.used_sessions -= 1
        db.session.delete(reservation)
        db.session.commit()
        return jsonify({"msg": "Reservation deleted"}), 200

@api.route('/reservations-package/<int:package_id>', methods=['GET'])
def handle_reservation_package(package_id):
    if request.method == 'GET':
        reservations = Reservation.query.filter_by(package_id=package_id)
        reservations = reservations.order_by(Reservation.date, Reservation.time_slot)
        reservations = list(map(lambda x: x.serialize(), reservations))
        return jsonify(reservations), 200