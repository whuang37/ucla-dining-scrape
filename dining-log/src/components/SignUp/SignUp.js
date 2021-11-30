import React, { useState} from 'react';
import styles from './SignUp.module.css';
<<<<<<< HEAD
import BackToLanding from '../backToLanding.js'
=======
import {Link} from 'react-router-dom';
>>>>>>> 89bc8dbeec9468fbe64569005ac8183e3bf50f35

 async function signUpUser(credentials) {
    return fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function SignUp(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [submit, setSubmit] = useState();
  const handleSubmit = async e => {
    e.preventDefault();

    const token = await signUpUser({
      username,
      password
    });
    
    fetch('http://localhost:8080/signedup')
  .then(response => response.json())
  .then(data => {setSubmit(data.response)});
    
  }

  let responseText;
  const renderResponseText = () => {
    if (submit == 'success') {
      return <div class={styles.signupSuccess}> Account created successfully, now <Link to="/login">Sign in</Link> </div>;
    } else if (submit == 'failed'){
      return  <div class={styles.signupError}>Account already exists, <Link to="/login">Sign in</Link></div>;
    }
  }
    return(
      <div>
        <BackToLanding/>
        <h1>Sign Up</h1>
        {renderResponseText()}
        <div class={styles.signupWrapper}>
          <form onSubmit={handleSubmit}>
            <label> 
              <input class={styles.signupInput} type="text" placeholder="Email" onChange={e => setUserName(e.target.value)} required/>
            </label>
            <br/>
            <label>
              <input class={styles.signupInput} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
            </label>
            <br/>
            <button class={styles.signupSubmit} type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    )
}