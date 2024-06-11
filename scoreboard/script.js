const data = [
    // Ejemplo de objeto con los datos de un jugador
    //!!! Importante, no es necesario ordenarlos por Score, ya que se encarga el backend de hacerlo y los envia en orden
    //estos datos deberia devolver el backend al hacerle fetch a la api

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
  ];

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

  createTable(data);
  