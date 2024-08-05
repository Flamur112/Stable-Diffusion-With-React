export function handlePost() {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* data to be sent */ }),
    })
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
  }
  
 export function handleGet() {
    fetch('http://localhost:3001/users')
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
  }
  
  export function handleUpdate() {
    fetch('http://localhost:3001/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* data to be sent */ }),
    })
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
  }
  
  export function handleDelete() {
    fetch('http://localhost:3001/users', {
      method: 'DELETE',
    })
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
  }