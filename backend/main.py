from flask import Flask, request, jsonify
from model import db, Scoreboard

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''  #TODO aca va la uri de la base de datos, no se como se consigue aun.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    #? creo que seria algo asi pero falta returnear bien
    scoreboard = Scoreboard.query.order_by(Scoreboard.score.desc()).all()
    return 

@app.route('/scoreboard/add', methods=['POST'])
def add_score():
    #TODO ver como añadir y ordenar por score

    
    db.session.commit()
    return

@app.route('/scoreboard/top', methods=['GET'])
def get_top10():
    #! faltaria returnearlo bien
    top10 = Scoreboard.query.order_by(Scoreboard.score.desc()).limit(10).all()
    return 


@app.route('/scoreboard/clear', methods=['DELETE'])
def clear_scoreboard():
    #segun lo que googlee para borrar todo de una tabla se hace asi
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
