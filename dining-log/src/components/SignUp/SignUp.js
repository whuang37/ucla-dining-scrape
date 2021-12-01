import React, { useState} from 'react';
import styles from './SignUp.module.css';
import BackToLanding from '../backToLanding.js'
import {Link, Navigate} from 'react-router-dom';

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
  const [allergens, setAllergens] = useState([]);
  const [clickedAllergens, setClickedAllergens] = useState(new Array(9).fill(false));
  const [calories, setCalories] = useState();

  const [signedIn, setSignedIn] = useState();

  const [allergenNammes, setAllergenNames] = useState(["gluten", "wheat", "eggs", "milk", "soybeans", "nuts", "fish", "shellfish", "peanuts"])

  const [submit, setSubmit] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(allergens);
    await signUpUser({
      username,
      password,
      allergens,
      calories
    });
    
    fetch('http://localhost:8080/signedup')
  .then(response => response.json())
  .then(data => {setSubmit(data.response)});
    
  }
  let responseText;
  const renderResponseText = () => {
    if (submit == 'success') {
      setTimeout(() =>
      {
        sessionStorage.setItem('username', username);
        setSignedIn(true);
      }, 2000);
      return <div class={styles.signupSuccess}> Account created successfully </div>;
    } else if (submit == 'failed'){
      return  <div class={styles.signupError}>Account already exists, <Link to="/login">Sign in</Link></div>;
    }
  }

  const handleCheckBox = (position, name) => 
  {
    const updatedCheckedState = clickedAllergens.map((item, index) =>
      index === position ? !item : item
    );
    setClickedAllergens(updatedCheckedState);
    if(!clickedAllergens[position])
    {
      setAllergens(allergens.concat(name));
    }
    else
    {
      let new_allergens = allergens;
      new_allergens.splice(new_allergens.indexOf(name), 1);
      setAllergens(new_allergens);
    }
    
  }

  const handleSignedIn = () => {if(signedIn){return (<Navigate to="/dashboard"></Navigate>);}}

    return(
      <div>
        <BackToLanding/>
        <h1>Sign Up</h1>
        {renderResponseText()}
        {handleSignedIn()}
         <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Email" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <div>
              <p class={styles.prefHeader}>Allergies</p>
              <form class={styles.allergenGrid}>
                {allergenNammes.map((item, index) => {return(<div>
                  <input
                    type="checkbox"
                    checked={clickedAllergens[index]}
                    onChange={() => handleCheckBox(index, item)}
                  />
                  <span class={styles.label}>{item}</span>
                </div>);})}
              </form>

            <p class={styles.prefHeader}>Daily Calorie Goal</p>
            <label>
              <input type="text" id='grey' placeholder="2000" onChange={e => setCalories(e.target.value)}/>
            </label>
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    )
}