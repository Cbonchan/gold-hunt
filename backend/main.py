from flask import Flask, request, jsonify
from model import db, Scoreboard

app = Flask(__name__)
#creeria que es asi, pero no estoy seguro, para esto, el usuario, la contraseña 
#y el nombre de la base deben ser postgres, y la base debe estar previamente creada
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/postgres'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    scoreboard_json = [{"name": entry.name, "score": entry.score, "datetime": entry.datetime} for entry in scoreboard]
    return jsonify(scoreboard_json)


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
    #esto lo copie de la clase del profe, hay que ver si es lo optimo, calculo que si
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=5000)
    print('Server started')
