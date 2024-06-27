import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Scoreboard(db.Model):
    __tablename__ = 'scoreboard'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    datetime = db.Column(db.String(16), nullable=False)
    achievementId = db.Column(db.String(32), nullable=False)

    def __init__(self, name, score, achievementId):
        self.name = name
        self.score = score
        self.datetime = datetime.datetime.now().strftime("%d/%m %H:%M")
        self.achievementId = achievementId if achievementId else ""

class Achievement(db.Model):
    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(80), nullable=False)
    timesObtained = db.Column(db.Integer, nullable=False, default=0)
    logo = db.Column(db.String(80), nullable=False)

    def __init__(self, name, description, logo):
        self.name = name
        self.description = description
        self.logo = logo