function addRecord() {
    let scoreInput = document.getElementById("scoreAdd");
    let nameInput = document.getElementById("nameAdd");
    let achievementIdInput = document.getElementById("achievementIdAdd");
    let score = scoreInput.value;
    let name = nameInput.value;
    let achievementId = achievementIdInput.value;

    if (name === '') {
        nameInput.placeholder = 'Name not valid';
        return;
    }
    if (score === '' || isNaN(score)) {
        scoreInput.placeholder = 'Score not valid';
        return;
    }

    let updatePromises = [];

    if (achievementId !== '') {
        updatePromises = updateIdRecord(achievementId);
    }

    Promise.all(updatePromises)
        .then(() => {
            let dict = {
                name: name,
                score: score,
                achievementId: achievementId
            };

            return fetch("http://localhost:5000/scoreboard/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dict)
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('message')) {
                console.log('Score added:', data.message);
                location.reload();
            }
        })
        .catch(error => console.log("ERROR", error));
}

function updateIdRecord(achievementId) {
    let ids = achievementId.split(';');
    let updatePromises = ids.map(id => {
        return fetch(`http://localhost:5000/achievements/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('message')) {
                console.log('Achievement updated:', data.message);
            } else if (data.hasOwnProperty('error')) {
                console.error('Achievement not found:', data.error);
            }
        })
        .catch(error => console.log("ERROR", error));
    });

    return updatePromises;
}

function removeRecord(){
    let idInput = document.getElementById("idRemove");
    let id = idInput.value;
    if (id === '') {
        idInput.placeholder = 'ID not valid';
        return;
    }
    let dict = {
        id: id
    };
    fetch("http://localhost:5000/scoreboard/delete_by_id", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dict)
    })
    .then((response) => response.json())
    .then(data => {
        if (data.hasOwnProperty('error')) {
            console.error('ID not found:', data.error);
            idInput.placeholder = 'ID Not found';
            idInput.value = '';
        } else if (data.hasOwnProperty('message')) {
            console.log('Score deleted:', data.message);
            location.reload();
        }
    })
    .catch((error) => console.log("ERROR", error))

}

function updateRecord(){
    let idInput = document.getElementById("idUpdate");
    let id = idInput.value;
    if (id === '') {
        idInput.placeholder = 'ID not valid';
        return;
    }
    let scoreInput = document.getElementById("scoreUpdate");
    let nameInput = document.getElementById("nameUpdate");
    let score = scoreInput.value;
    let name = nameInput.value;
    let dict = {
        id: id,
        name: name,
        score: score
    };
    fetch("http://localhost:5000/scoreboard/update_by_id", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dict)
    })
    .then((response) => response.json())
    .then(data => {
        if (data.hasOwnProperty('error')) {
            console.error('ID not found:', data.error);
            idInput.placeholder = 'ID Not found';
            idInput.value = '';
            scoreInput.value = '';
            nameInput.value = '';
        } else if (data.hasOwnProperty('message')) {
            console.log('Score updated:', data.message);
            location.reload();
        }
    })
    .catch((error) => console.log("ERROR", error))
}

function deleteAll(){
    fetch("http://localhost:5000/scoreboard/clear", {
        method: "DELETE"
    })
    .then((response) => response.json())
    .then(data => {
        if (data.hasOwnProperty('message')) {
            console.log('Scoreboard cleared:', data.message);
            location.reload();
        }
    })
    .catch((error) => console.log("ERROR", error))
}

function fakeData(){
    fetch("http://localhost:5000/scoreboard/test")
        .then((response) => response.json())
        .then(data => {
            if (data.hasOwnProperty('message')) {
                console.log('Fake data added:', data.message);
                location.reload();
            }
        })
        .catch((error) => console.log("ERROR", error))
}

fetch('http://localhost:5000/scoreboard/admin')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createScoreTable(data);
    })
    .catch((error) => {console.error('Error:', error); });

fetch('http://localhost:5000/achievements')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createAchievementTable(data);
    })
    .catch((error) => {console.error('Error:', error); });

function createAchievementTable(data) {
    const achievementDiv = document.getElementById('achievement');
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Id','Name', 'Description', 'Times Obteined'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.appendChild(document.createTextNode(item.id));
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.appendChild(document.createTextNode(item.name));
        row.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.appendChild(document.createTextNode(item.description));
        row.appendChild(descriptionCell);

        const timesObteinedCell = document.createElement('td');
        timesObteinedCell.appendChild(document.createTextNode(item.timesObtained));
        row.appendChild(timesObteinedCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    achievementDiv.appendChild(table);

}

function createScoreTable(data) {
    const scoreboardDiv = document.getElementById('scoreboard');
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['id','Name', 'Score', 'Achievement','Date'];
    headers.forEach(headerText => {
      const header = document.createElement('th');
      header.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.appendChild(document.createTextNode(item.id));
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.appendChild(document.createTextNode(item.name));
        row.appendChild(nameCell);

        const scoreCell = document.createElement('td');
        scoreCell.appendChild(document.createTextNode(item.score));
        row.appendChild(scoreCell);

        const achievementCell = document.createElement('td');
        achievementCell.appendChild(document.createTextNode(item.achievementId));
        row.appendChild(achievementCell);

        const dateCell = document.createElement('td');
        dateCell.appendChild(document.createTextNode(item.datetime));
        row.appendChild(dateCell);


        tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    scoreboardDiv.appendChild(table);
}

document.getElementById('psw').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        admin(); 
    }
});

function saveAuthentication() {
    const now = new Date().getTime();
    localStorage.setItem('authentication', now.toString());
}


function checkAuthentication() {
    const authentication = localStorage.getItem('authentication');
    if (authentication) {
        const now = new Date().getTime();
        const timer = (now - parseInt(authentication)) / (1000 * 60);
        if (timer < 10) {
            return true;
        }
    }
    return false;
}

function admin(){
    let psw = document.getElementById('psw').value;
    fetch('http://localhost:5000/adminLog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: psw})
    })
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty('error')) {
            document.getElementById('psw').value = '';
            document.getElementById('psw').placeholder = 'Incorrect password';
        } else if (data.hasOwnProperty('message')) {
            console.log('Success:', data.message);
            document.getElementById('page').classList.remove('none');
            document.getElementById('password').classList.add('none');
            saveAuthentication();
        }
    })
    .catch((error) => {console.error('Error:', error); });
}

function logOut(){
    localStorage.removeItem('authentication');
    location.reload();
}


function addAchievement(){
    var option1 = document.querySelector('#duckhunt');
    var option2 = document.querySelector('#bluegold');
    var option3 = document.querySelector('#millionaire');
    var option4 = document.querySelector('#bomberman');
    var option5 = document.querySelector('#timetraveler');
    var achievementList = [];

    if (option1.checked) {
        achievementList.push(option1.name);
    }
    if (option2.checked) {
        achievementList.push(option2.name);
    }
    if (option3.checked) {
        achievementList.push(option3.name);
    }
    if (option4.checked) {
        achievementList.push(option4.name);
    }
    if (option5.checked) {
        achievementList.push(option5.name);
    }
    const requests = achievementList.map(achievement => {
        return fetch('http://localhost:5000/achievements/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: achievement })
        })
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('message')) {
                console.log('Achievement updated:', data.message);
            }
        })
        .catch(error => {
            console.error('Error updating achievement:', error);
        });
    });

   
    Promise.all(requests).then(() => location.reload());

}

window.onload = function() {
    if (checkAuthentication()) {
        document.getElementById('page').classList.remove('none');
        document.getElementById('password').classList.add('none');
    }
}