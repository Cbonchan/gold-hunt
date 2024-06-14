from flask import Flask, request, jsonify
from flask_cors import CORS
from model import db, Scoreboard

app = Flask(__name__)
CORS(app)
#creeria que es asi, pero no estoy seguro, para esto, el usuario, la contraseña 
#y el nombre de la base deben ser postgres, y la base debe estar previamente creada
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/postgres'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)

#! Esto es para probar la conexion de la API, funciona correctamente, falta configurar la base de datos
@app.route('/scoreboard_prueba', methods=['GET'])
def return_scoreboard():
    fakeScore = [
        {"name": "Juan Perez", "score": 85, "datetime": "10/07 14:30" },
        {"name": "Ana Lopez", "score": 92, "datetime": "15/07 12:45" },
        {"name": "Carlos Diaz", "score": 78, "datetime": "20/07 16:15" },
        {"name": "Lucia Gomez", "score": 88, "datetime": "25/07 11:00" },
        {"name": "Miguel Torres", "score": 95, "datetime": "01/08 09:30" },
        {"name": "Sofia Ramirez", "score": 82, "datetime": "05/08 14:55" },
        {"name": "Pedro Fernandez", "score": 76, "datetime": "10/08 13:45" },
        {"name": "Marta Sanchez", "score": 90, "datetime": "15/08 10:30" },
        {"name": "Diego Gutierrez", "score": 84, "datetime": "20/08 15:20" },
        { "name": "Elena Morales", "score": 89, "datetime": "25/08 11:40" }
    ]
    return jsonify(fakeScore)


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
    db.session.commit()
    return jsonify({'message': 'Scoreboard cleared'})



if __name__ == '__main__':
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=5000)
    print('Server started')
