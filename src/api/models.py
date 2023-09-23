from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_verified = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "isVerified": self.is_verified
            # do not serialize the password, its a security breach
        }

class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, unique=False, nullable=False)
    total_sessions = db.Column(db.Integer, unique=False, nullable=False)
    used_sessions = db.Column(db.Integer, unique=False, nullable=False)
    purchase_date = db.Column(db.DateTime, unique=False, nullable=False)
    expiration_date = db.Column(db.DateTime, unique=False, nullable=False)
    is_paid = db.Column(db.Boolean(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Package {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "price": self.price,
            "totalSessions": self.total_sessions,
            "usedSessions": self.used_sessions,
            "purchaseDate": self.purchase_date,
            "expirationDate": self.expiration_date,
            "purchaseDayReadable": self.purchase_date.strftime("%m-%d-%-y"),
            "expirationDayReadable": self.expiration_date.strftime("%m-%d-%-y"),
            "isPaid": self.is_paid,
            "isActive": self.is_active,
            "userId": self.user_id
        }
    
class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time_slot = db.Column(db.Integer, unique=False, nullable=False)
    type = db.Column(db.String(120), unique=False, nullable=False)
    date = db.Column(db.DateTime, unique=False, nullable=False)
    patient_name = db.Column(db.String(120), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('package.id'), nullable=False)

    def __repr__(self):
        return f'<Reservation {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "timeSlot": self.time_slot,
            "type": self.type,
            "date": self.date.strftime("%A %d, %B %Y"),
            "reservationDay": self.date.strftime("%m-%d-%-y"),
            "patientName": self.patient_name,
            "userId": self.user_id,
            "packageId": self.package_id
        }
    
    