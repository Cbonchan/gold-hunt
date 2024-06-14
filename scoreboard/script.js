//el fetch es con informacion de prueba, cuando configuremos base de datos, fetch a otro endpoint
  fetch('http://localhost:5000/scoreboard_prueba')
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
  
      Object.values(item).forEach(text => {
        const cell = document.createElement('td');
        cell.appendChild(document.createTextNode(text));
        row.appendChild(cell);
      });
  
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    scoreboardDiv.appendChild(table);
  }

  