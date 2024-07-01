fetch('http://localhost:5000/achievements')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createTable(data);
    })
    .catch((error) => {console.error('Error:', error); });

function createTable(data) {
    const achievementsDiv = document.getElementById('achievements');
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Description', 'Times Obtained'];
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
        scoreCell.appendChild(document.createTextNode(item.description));
        row.appendChild(scoreCell);
    
        const dateCell = document.createElement('td');
        dateCell.appendChild(document.createTextNode(item.timesObtained));
        row.appendChild(dateCell);
    
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    achievementsDiv.appendChild(table);
    }