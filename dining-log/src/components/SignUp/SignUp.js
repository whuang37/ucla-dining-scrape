import React, { useState} from 'react';
import styles from './SignUp.module.css';
import BackToLanding from '../backToLanding.js'
import {Link} from 'react-router-dom';

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
  const [allergens, setAllergens] = useState({
    "gluten": false,
    "wheat": false,
    "eggs": false,
    "milk": false,
    "soybeans": false,
    "nuts": false,
    "fish": false,
    "shellfish": false,
    "peanuts": false,
  });
  const [calories, setCalories] = useState();

  const [submit, setSubmit] = useState();
  const handleSubmit = async e => {
    e.preventDefault();

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
                <div>
                  <input
                    type="checkbox"
                    checked={allergens.gluten}
                    onClick={() => {setAllergens(!allergens.gluten)}}
                  />
                  <span class={styles.label}>Gluten</span>
                </div>

                <div>
                  <input
                      type="checkbox"
                      checked={allergens.wheat}
                      onClick={() => {setAllergens(!allergens.wheat)}}
                  />
                  <span class={styles.label}>Wheat</span>
                </div>
                
                <div>
                  <input
                      type="checkbox"
                      checked={allergens.eggs}
                      onClick={() => {setAllergens(!allergens.eggs)}}
                  />
                  <span class={styles.label}>Eggs</span>
                </div>

                <div>
                  <input
                      type="checkbox"
                      checked={allergens.milk}
                      onClick={() => {setAllergens(!allergens.milk)}}
                  />
                  <span class={styles.label}>Milk</span>
                </div>
                    
                <div>
                  <input
                      type="checkbox"
                      checked={allergens.soybeans}
                      onClick={() => {setAllergens(!allergens.soybeans)}}
                  />
                  <span class={styles.label}>Soybeans</span>
                </div>

                <div>
                  <input
                      type="checkbox"
                      checked={allergens.nuts}
                      onClick={() => {setAllergens(!allergens.nuts)}}
                  />
                  <span class={styles.label}>Nuts</span>
                </div>

                <div>
                  <input
                      type="checkbox"
                      checked={allergens.fish}
                      onClick={() => {setAllergens(!allergens.fish)}}
                  />
                  <span class={styles.label}>Fish</span>
                </div>

                <div>
                  <input
                      type="checkbox"
                      checked={allergens.shellfish}
                      onClick={() => {setAllergens(!allergens.shellfish)}}
                  />
                  <span class={styles.label}>Shellfish</span>
                </div>
                    
                <div>
                  <input
                      type="checkbox"
                      checked={allergens.peanuts}
                      onClick={() => {setAllergens(!allergens.peanuts)}}
                  />
                  <span class={styles.label}>Peanuts</span>
                </div>
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