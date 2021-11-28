import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";
import { useState } from 'react';
import FoodList from "./FoodList";


async function filter(credentials) {
    return fetch('http://localhost:8080/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Filter(props) {
    const [meal, setMeal] = useState('Meal');
    const [hall, setHall] = useState('Dining Hall');
    const [allergens, setAllergens] = useState(false);
    const [calories, setCalories] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState({});
    const [displayFoods, setDisplayFoods] = useState({});   //displayFoods = response + selectedFoods

    const handleMeal=(e)=>{
        setMeal(e);
    }
    const handleHall=(e)=>{
        setHall(e);
    }

    // callback function to add foodItem to array of selectedFoods, pass function down to foodlist --> fooditem as a prop, bind checked state to function and pass fooditem back up to filteredList so we can add it to the array

    // object {name, allergens, calories}
    

    const handleChange = async e => {
        e.preventDefault();
    
        const token = await filter({
          meal,
          hall,
          allergens,
          calories,
          selectedFoods
        });

        fetch('http://localhost:8080/auth')
        .then(response => response.json())
        .then(data => {
          
        });
    }

    return (
        <div>
            <div class={styles.filterBar} onChange={handleChange}>
                <Dropdown onSelect={handleMeal}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {meal}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item eventKey="Breakfast">Breakfast</Dropdown.Item>
                        <Dropdown.Item eventKey="Lunch">Lunch</Dropdown.Item>
                        <Dropdown.Item eventKey="Dinner">Dinner</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown onSelect={handleHall}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {hall}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">  
                        <Dropdown.Item eventKey="Bruin Plate">Bruin Plate</Dropdown.Item>
                        <Dropdown.Item eventKey="De Neve">De Neve</Dropdown.Item>
                        <Dropdown.Item eventKey="Epicuria">Epicuria</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <form> 
                    <label>
                        <input
                            type="checkbox"
                            checked={allergens}
                            onClick={e => setAllergens(e.target.checked)}
                        />
                        <span class={styles.label}>Filter by Dietary Restrictions</span>
                    </label>
                </form>

                <form> 
                    <label>
                        <input
                            type="checkbox"
                            checked={calories}
                            onClick={e => setCalories(e.target.checked)}
                        />
                        <span class={styles.label}>Filter by Daily Calorie Goal</span>
                    </label>
                </form>

                <button class={styles.button} type="submit">Find Food</button>
            </div>

            <FoodList meal={meal} hall={hall}/>
            
        </div>
    )
}