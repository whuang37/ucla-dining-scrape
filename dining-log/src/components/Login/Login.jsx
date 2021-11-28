import React, { useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import styles from './Login.module.css';

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
  .then(data => {  if(data.response == 'authorized') {
                                      setSubmit(true); 
                                    }
                                    else
                                    {
                                      setSubmit(false);
                                      setWrongPass(data.response);
                                    }});
    
  }

  let responseText;
  const renderResponseText = () => {
    if (wrongPass == 'failed') {
      return <div class={styles.loginMessage}>Wrong Password</div>;
    } else if (wrongPass == 'new'){
      return <div class={styles.loginMessage}>No account found</div>;
    }
  }
  const handleUsername = (e) => {
    setUserName(e.target.value); 
    {props.setUsername(e.target.value)};
  }
  if(!submit)
  {
    return(
      <div>
        <h1>Log In</h1>
        {renderResponseText()}
        <div class={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <label>
              <input class={styles.loginInput} type="text" placeholder="Email" onChange={handleUsername} required/>
            </label>
            <br/>
            <label>
              <input class={styles.loginInput} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </label>
            <br/>
            <button class={styles.loginSubmit}type="submit">Submit</button>
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