import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Scoreboard(db.Model):
    #? no se si faltan mas datos o si esto esta correcto del todo
    __tablename__ = 'scoreboard'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    time = db.Column(db.DateTime, default=datetime.datetime.now())

