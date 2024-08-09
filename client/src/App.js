import React, { useState } from 'react';
import Axios from 'axios';

// const BASE_URL = 'http://localhost:3001/classroom/team-os/logindemo/'; 
const BASE_URL = "http://class3.hopekcc.org/classroom/team-os/logindemo";
// wat

function RegForm() { 
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('${BASE_URL}/api/register', { // make variable url?
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    })
    .then(response => {
      if(response.status === 200) {
        alert("Valid Registration!"); 
      }
      console.log(response); 
    })
    .catch(error => { // make more clear
      console.error('Error with registration:', error);
      alert("Invalid Registration!");
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
            type="password"
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
    Axios.post('${BASE_URL}/api/login', {
      email: inputs.email,
      password: inputs.password
    })
    .then(response => {
      if(response.status === 200) {
        alert("Valid User!"); 
      }
      console.log(response); 
    })
    .catch(error => {
      console.error('Error with login:', error); 
      alert("Invalid User!");

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
            type="password" 
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
        SQL Login
      </h1>
      {RegForm()}
      
      {LoginForm()}

    </div>
  );
}

export default App;
