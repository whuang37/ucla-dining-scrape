import React, { useState} from 'react';
import './SignUp.css';

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
      return <h6 style={{ color: 'green' }}>Account created successfully</h6>;
    } else if (submit == 'failed'){
      return  <h6 style={{ color: 'red' }}>Account already exists</h6>;
    }
  }
    return(
      <div className="signup-wrapper">
        <h1>Please Sign Up</h1>
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