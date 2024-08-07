import React, { useState } from 'react';
import Axios from 'axios';

// const BASE_URL = 'http://localhost:3001/classroom/team-os/logindemo/'; 
// const BASE_URL = 'http://class3.hopekcc.org/classroom/team-os/logindemo/'; 


function RegForm() { 
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/classroom/team-os/logindemo/api/register', {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    })
    .then(response => {
      console.log(response.data); // Handle success response
      alert("Successful insert");
    })
    .catch(error => {
      console.error('Error inserting data:', error); // Handle error
      alert("Failed to insert data");
    });
  };

  return (
    <div className="RegForm">
      <h2>Register a new account:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password" // changed to type="password" for password input
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register!</button>
      </form>
    </div>
  );
}


function LoginForm(){
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/classroom/team-os/logindemo/api/login', {
      email: inputs.email,
      password: inputs.password
    })
    .then(response => {
      if(response.data.message) {
        alert("Valid!");
      }

      console.log(response.data); // Handle success response

    })
    .catch(error => {
      console.error('Error inserting data:', error); // Handle error
      alert("Invalid!");
    });
  };

  return (
    <div className="LoginForm">
      <h2>Login to Existing Account:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password" // changed to type="password" for password input
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login!</button>
      </form>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <h1>
        Austin Chan - Week 4 - User Reg and Login Test using React, NodeJS, and MySQL
      </h1>
      {RegForm()}
      
      {LoginForm()}

    </div>
  );
}

export default App;
