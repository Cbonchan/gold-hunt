from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import text
from model import db, Scoreboard, Achievement
import random

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/postgres'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Returns a json with the scoreboard filtered by the score in descending order
@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)

#Returns a json with a complete scoreboard filtered by the score in descending order for the admin page
@app.route('/scoreboard/admin', methods=['GET'])
def get_admin_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"id":entry.id ,"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)

#Put the fake data in the scoreboard table
@app.route('/scoreboard/test', methods=['GET'])
def return_scoreboard():
    fakeScore = [
        {"name": "Juan Perez", "score": 85},
        {"name": "Ana Lopez", "score": 92},
        {"name": "Carlos Diaz", "score": 78},
        {"name": "Lucia Gomez", "score": 88},
        {"name": "Miguel Torres", "score": 95},
        {"name": "Sofia Ramirez", "score": 82},
        {"name": "Pedro Fernandez", "score": 5},
        {"name": "Marta Sanchez", "score": 9},
        {"name": "Diego Gutierrez", "score": 20},
        { "name": "Elena Morales", "score": 10}
    ]
    achievements = Achievement.query.all()
    for score in fakeScore:
        new_score = Scoreboard(name=score['name'], score=score['score'])
        db.session.add(new_score)
        db.session.commit()
        random_achievements = random.sample(achievements, 2)
        #por cada entry de los fakescores se le asignan 2 logros aleatorios 
        for achievement in random_achievements:
            achievement.timesObtained += 1
    db.session.commit()

    return jsonify({"message": "Fake data added"})

#Add a new score to the scoreboard table recibing a json with the name and score, updates the score if the player is already registered
@app.route('/scoreboard/add', methods=['POST'])
def add_score():
    data = request.get_json()

    name = data['name']
    new_score = data['score'];

    registered_player = Scoreboard.query.filter_by(name=name).first()

    if registered_player:
        if new_score > registered_player.score:
            registered_player.score = new_score;
            db.session.commit()
            return jsonify({"message" : f"Puntaje actualizado para {name}"})
        else:
            return jsonify({"message" : f"El puntaje nuevo de {name} no es mayor, por lo tanto no se pudo actualizar"})

    else:
        new_score = Scoreboard(name=data['name'], score=data['score'])
        db.session.add(new_score)
        db.session.commit()
        return  jsonify({"message": "Score added successfully"})

#Returns a json with the top 10 scores in the scoreboard table filtered by the score in descending order
@app.route('/scoreboard/top', methods=['GET'])
def get_top10():
    top10 = Scoreboard.query.order_by(Scoreboard.score.desc()).limit(10).all()
    top10_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in top10]
    return jsonify(top10_json)

#Delete all data in the scoreboard table
@app.route('/scoreboard/clear', methods=['DELETE'])
def clear_scoreboard():
    Scoreboard.query.delete()
    db.session.execute(text("ALTER SEQUENCE scoreboard_id_seq RESTART WITH 1;"))
    Achievement.query.update({Achievement.timesObtained: 0})
    db.session.commit()
    return jsonify({'message': 'Scoreboard cleared'})

#Update the name and/or the score of a player in the scoreboard table by the id
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

#Delete a player in the scoreboard table by the id
@app.route('/scoreboard/delete_by_id', methods=['DELETE'])
def delete_by_id():
    data = request.get_json()
    score = Scoreboard.query.get(data['id'])
    if score is None:
            return jsonify({'error': 'ID not found'})
    db.session.delete(score)
    db.session.commit()
    return jsonify({'message': 'Score deleted'})

#Returns a json with the achievements in the achievements table ordered by name
@app.route('/achievements', methods=['GET'])
def get_achievements():
    achievements = Achievement.query.order_by(Achievement.name).all()
    achievements_json = [{"id": entry.id ,"name": entry.name, "description": entry.description, "timesObtained": entry.timesObtained, "logo": entry.logo } for entry in achievements]
    return jsonify(achievements_json)


#Returns json with one achievement 
@app.route('/achievements/<name>', methods=['GET'])
def get_achievement_by_name(name):
    achievement = Achievement.query.filter_by(name=name).first()
    achievement_data = {
        "name" : achievement.name,
        "description": achievement.description,
        "logo": achievement.logo
    }
    return jsonify(achievement_data)

#Updates the timesObtained+1 of an achievement by the name
@app.route('/achievements/update', methods=['PUT'])
def update_times_obtained():
    data = request.get_json()
    achievement = Achievement.query.filter_by(name=data['name']).first()
    if achievement is None:
        return jsonify({'error': 'Achievement not found'})
    achievement.timesObtained += 1
    db.session.commit()
    return jsonify({'message': 'Achievement updated'})

#Validate the admin password
@app.route('/adminLog', methods=['POST'])
def admin_log():
    data = request.get_json()
    if data['password'] == 'admin':
        return jsonify({'message': 'Login successful'})
    return jsonify({'error': 'Invalid credentials'})

def initializeAchievement():
    with app.app_context():
        achievements = Achievement.query.all()
        if len(achievements) > 0:
            return
        DuckHunter = Achievement(name='Duck-Hunt', description='Shoot the duck!', logo='./images/duckLogo.gif')
        BlueGold = Achievement(name='Blue Gold?!', description='You shot all the blue coins!', logo='./images/blueGoldLogo.png')
        BomberMan = Achievement(name='Bomber Man', description='Shoot at least 5 bombs!', logo='./images/bombLogo.png')
        Millionaire = Achievement(name='Millionaire', description='Scored at least 150 points!', logo='./images/millionaireLogo.png')
        db.session.add_all({DuckHunter, BlueGold, BomberMan, Millionaire})
        db.session.commit()

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    initializeAchievement()
    app.run(host='0.0.0.0', debug=True, port=5000)
