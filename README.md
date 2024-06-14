Instalacion linux 

```bash
python3 -m venv venv
source venv/bin/activate
pip install flask
pip install flask_sqlalchemy
pip install flask-cors
```

Ejecutar el servidor en linux

```bash
cd backend
source venv/bin/activate
flask run --debug
```