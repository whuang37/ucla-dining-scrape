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
  .then(data => {  if(data.response == 'authorized')
                                      setSubmit(true);
                                    else
                                    {
                                      setSubmit(false);
                                      setWrongPass(data.response);
                                    }});
    
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
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        {renderResponseText()}
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
  else
  {
    return <Navigate to="/dashboard" />
  }
}