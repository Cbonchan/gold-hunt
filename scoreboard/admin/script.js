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
      createTable(data);
    })
    .catch((error) => {console.error('Error:', error); });


function createTable(data) {
    const scoreboardDiv = document.getElementById('scoreboard');
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['id','Name', 'Score', 'Date'];
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

window.onload = function() {
    if (checkAuthentication()) {
        document.getElementById('page').classList.remove('none');
        document.getElementById('password').classList.add('none');
    }
}