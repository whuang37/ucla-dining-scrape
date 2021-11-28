import React, { useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [submit, setSubmit] = useState();
  const [wrongPass, setWrongPass] = useState();
  const handleSubmit = async e => {
    e.preventDefault();

    const token = await loginUser({
      username,
      password
    });
    

    fetch('http://localhost:8080/auth')
    .then(response => response.json())
    .then(data => {
      if(data.response == 'authorized')
        setSubmit(true);
      else{
        setSubmit(false);
        setWrongPass(data.response);
      }
    });
  }

  let responseText;
  const renderResponseText = () => {
    if (wrongPass == 'failed') {
      return <h6 style={{ color: 'red' }}>Wrong Password</h6>;
    } else if (wrongPass == 'new'){
      return  <h6 style={{ color: 'red' }}>No account found</h6>;
    }
  }

  if(!submit)
  {
    return(
      <div>
        <h1>Log In</h1>
        {renderResponseText()}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Email" onChange={e => setUserName(e.target.value)}/>
            </label>
            <br/>
            <label>
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
  else
  {
    return <Navigate to="/dashboard" />
  }
}