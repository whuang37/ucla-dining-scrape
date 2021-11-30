import React, { useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import BackToLanding from '../backToLanding.js'

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [submit, setSubmit] = useState();
  const [wrongPass, setWrongPass] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    async function loginUser(credentials) {
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json())
        fetch('http://localhost:8080/auth')
    .then(response => response.json())
    .then(data => {  if(data.response === 'authorized') {
                                          sessionStorage.setItem('username', username)
                                        setSubmit(true); 
                                      }
                                      else
                                      {
                                        setSubmit(false);
                                        setWrongPass(data.response);
                                      }
                                    });

     }
    await loginUser({
      username,
      password
    });
    
  }
  const renderResponseText = () => {
    if (wrongPass == 'failed') {
      return <div class={styles.loginMessage}>Wrong Password</div>;
    } else if (wrongPass == 'new'){
      return <div class={styles.loginMessage}>No account found, please sign up</div>;
    }
  }

  if(!submit)
  {
    return(
      <div>
        <BackToLanding/>
        <h1>Log In</h1>
        {renderResponseText()}
        <div class={styles.formWrapper}>
          <form onSubmit={handleSubmit}>
            <label>
              <input class={styles.loginInput} type="text" placeholder="Email" onChange={e => setUserName(e.target.value)} required/>
            </label>
            <br/>
            <label>
              <input class={styles.loginInput} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </label>
            <br/>
            <button class={styles.loginSubmit}type="submit">Login</button>
            <div> Need an account? <Link to="/signup">Sign up</Link> </div>
          </form>
        </div>
      </div>
    )
  }
  else
  {
    return <Navigate to="/foodpage" />
  }
}