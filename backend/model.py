import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Scoreboard(db.Model):
    __tablename__ = 'scoreboard'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    datetime = db.Column(db.String(16), nullable=False)

    def __init__(self, name, score):
        self.name = name
        self.score = score
        self.datetime = datetime.datetime.now().strftime("%d/%m %H:%M")