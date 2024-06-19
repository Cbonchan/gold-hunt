//el fetch es con informacion de prueba, cuando configuremos base de datos, fetch a otro endpoint
  fetch('http://localhost:5000/scoreboard')
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
    const headers = ['Name', 'Score', 'Date'];
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

  function admin(){
    let psw = document.getElementById('psw').value;
    if (psw === 'admin') {
      window.location.href = 'admin/index.html';
    }
    else {
      document.getElementById('psw').value = '';
      document.getElementById('psw').placeholder = 'Incorrect password';
      
    }
  }

  