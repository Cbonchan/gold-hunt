from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import text
from model import db, Scoreboard

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/postgres'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)

@app.route('/scoreboard/admin', methods=['GET'])
def get_admin_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"id":entry.id ,"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)

#este endpoint es para ingresar desde la web, agrega puntajes falsos a la base de datos
@app.route('/scoreboard/test', methods=['GET'])
def return_scoreboard():
    fakeScore = [
        {"name": "Juan Perez", "score": 85},
        {"name": "Ana Lopez", "score": 92},
        {"name": "Carlos Diaz", "score": 78},
        {"name": "Lucia Gomez", "score": 88},
        {"name": "Miguel Torres", "score": 95},
        {"name": "Sofia Ramirez", "score": 82},
        {"name": "Pedro Fernandez", "score": 76},
        {"name": "Marta Sanchez", "score": 90},
        {"name": "Diego Gutierrez", "score": 84},
        { "name": "Elena Morales", "score": 89}
    ]
    for score in fakeScore:
        new_score = Scoreboard(name=score['name'], score=score['score'])
        db.session.add(new_score)
        db.session.commit()
    return jsonify({"message": "Fake data added"})


@app.route('/scoreboard/add', methods=['POST'])
def add_score():
    data = request.get_json()
    new_score = Scoreboard(name=data['name'], score=data['score'])
    db.session.add(new_score)
    db.session.commit()
    return  jsonify({"message": "Score added successfully"})

@app.route('/scoreboard/top', methods=['GET'])
def get_top10():
    top10 = Scoreboard.query.order_by(Scoreboard.score.desc()).limit(10).all()
    top10_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in top10]
    return jsonify(top10_json)


@app.route('/scoreboard/clear', methods=['DELETE'])
def clear_scoreboard():
    Scoreboard.query.delete()
    db.session.execute(text("ALTER SEQUENCE scoreboard_id_seq RESTART WITH 1;"))
    db.session.commit()
    return jsonify({'message': 'Scoreboard cleared'})

@app.route('/scoreboard/update_by_id', methods=['PUT'])
def update_by_id():
    data = request.get_json()
    score = Scoreboard.query.get(data['id'])
    
    if score is None:
            return jsonify({'error': 'ID not found'})

    if 'name' in data and 'score' in data:
        if data['name'] != "":
            score.name = data['name']
        if data['score'] != "":
            score.score = data['score']
    db.session.commit()
    return jsonify({'message': 'Score updated'})

@app.route('/scoreboard/delete_by_id', methods=['DELETE'])
def delete_by_id():
    data = request.get_json()
    score = Scoreboard.query.get(data['id'])
    if score is None:
            return jsonify({'error': 'ID not found'})
    db.session.delete(score)
    db.session.commit()
    return jsonify({'message': 'Score deleted'})

@app.route('/adminLog', methods=['POST'])
def admin_log():
    data = request.get_json()
    if data['password'] == 'admin':
        return jsonify({'message': 'Login successful'})
    return jsonify({'error': 'Invalid credentials'})


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=5000)
