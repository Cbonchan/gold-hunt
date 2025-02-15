# <span style="color: orange;">Gold Hunt</span>


### Description and functionality

**Gold Hunt** is a project that features both a front-end and a back-end. The front-end is coded in *HTML*, *CSS*, and *JavaScript*, while the back-end is developed in *Python* with *Flask*.<br> It is a reaction and point collection game. There are different types of objects to shoot at, each with a different value. The player has a limited time to shoot the objects and collect points. At the end of the time, the player can enter their name and save their score in a ranking that is stored in a *PostgreSQL* database.<br> Database management is done using *SQLAlchemy* for adding a new score, retrieving stored scores, updating or deleting one or all (Updates and deletions are exclusive to the Admin section).<br> The API is coded in *Python* with *Flask*, handling client requests through various endpoints present in the code.<br> There are 2 tables in the database: <br>
- **scoreboard**:

``` json
    "id": "int" (primary key)
    "name": "string"
    "score": "int"
    "datetime": "date" (parsed : "%d/%m %H:%M")
    "achievementId": "string" (foreign key of achievements separated with ';')
```
- **achievements**: 
``` json
    "id": "int" (primary key)
    "name": "string"
    "description": "string"
    "timesObtanied": "int"
```

The **scoreboard** table is responsible for storing player scores along with their ID, name, the date when the score was achieved and the ID of the achievements obtained by the player. The achievements are stored as a string of IDs separated by ';' 
. The endpoints provide information on these for handling in the Front-End and, as mentioned earlier, allow management of their data. <br>
The **achievements** table stores the achievements obtained by global players. Each time an achievement is earned, the **timesObtained** field in the database is updated. (This could be used to keep a record of the number of achievements obtained and thus control the difficulty of that achievement.) The endpoints also provide information on these for management in the Front-End.

### Distribution
The page has 3 main sections:
- **home**: where the game is located.
- **scoreboard**: where the ranking of players is displayed.
- **achievements**: where the achievements obtained by the players are shown.
- **About**: which provides information about the game and its creators.

Additionally, the **scoreboard** section features an administration area that requires a password to access. Here, some actions can be performed to manage the data of the tables designed for testing purposes, as using them would invalidate the scores obtained by real players.

### Style Design 

Based on retro games, the design of the page and the game are pixelated with the *PRESS START 2P* font. 
#### here some images of the game:

<img src="./images/DevelopImage.png" alt=" development stage of the game" width="50%">
<img src="./images/DevelopImage1.png" alt=" development stage of the game" width="50%">
<img src="./images/DevelopImage2.png" alt=" development stage of the game" width="50%">
<br>

#### And here is the Admin section for testing purposes:
<img src="./images/DevelopImage3.png" alt=" development stage of the game" width="50%">

## Game Instructions

 
 In the game, the player has to shoot the objects that appear on the screen to collect points. The player has 40 seconds to shoot as many objects as possible. The player can move the cannon with the mouse and shoot with the left mouse button. 
 
 The objects that appear on the screen are:
 - **Coin**: 1 point
 - **Blue coin**: 5 points
 - **Bird**: 10 points
 - **Bomb**: -10 points
 - **Clock**: +5 seconds

 Additionally, there is a **bonus zone** that appears when the player reaches a specific score. In this zone, only *Blue Coins* and some *Clocks* appear, and the time stops counting down while the player is in the zone. The appearance of the bonus zone becomes more difficult to reach as the game progresses.

 The player also can obtain achievements by reaching specific scores or shooting certain things. The achievements are displayed in the game and can be seen in the **achievements** section.


## Instalation and execution of the project

### Requirements
- **postgres database**: with the following configuration: <br>
***user***: postgres <br> ***password***: postgres <br> ***host***: localhost <br> ***port***: 5432 <br> ***database***: postgres <br> <br>
- **python** 3.8 or higher

### Installation and execution on Linux

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

```bash
cd backend
source venv/bin/activate
python3 app.py
```
***

### Installation and execution on Windows
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

```bash
cd backend
venv\Scripts\activate
python app.py
```

## Team Members

- **Sebastián Nahuel Basterra**: 
    - **Email**: sbasterra@fi.uba.ar
    - **Padron**: 110428

- **Gabriel Franco Boggia**: 
    - **Email**: fboggia@fi.uba.ar
    - **Padron**: 109175

- **Daniel Contreras**: 
    - **Email**: dperezc@fi.uba.ar
    - **Padron**: 111102