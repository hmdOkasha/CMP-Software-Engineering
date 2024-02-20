function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');

        deleteButton.addEventListener('click', () => deleteEmployee(item.id));

        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

document.getElementById('employeeForm').addEventListener('submit', createEmployee);

// TODO
// add event listener to delete button

// TODO
function createEmployee(event) {
  // get data from input field
  // send data to BE
  // call fetchEmployees
  event.preventDefault();
  const employeeId = document.getElementById('id').value;
  const employeeName = document.getElementById('name').value;
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: employeeId, name: employeeName })
  })
    .then(response => {
      if (response.ok) {
        fetchEmployees();
      } else {
        throw new Error('Failed to create employee');
      }
    })
    .catch(error => console.error(error));
}

function deleteEmployee(id) {
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchEmployees();
      } 
    })
}

fetchEmployees()
