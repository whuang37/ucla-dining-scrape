import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";
import { useState } from 'react';

// should filter button be disabled until the user chooses a dining hall and meal??

export default function Filter(props) {
    const [hall, setHall]=useState('Select Dining Hall');
    const [meal, setMeal]=useState('Select Meal');
    const [allergens, setAllergens] = useState(false);
    const [calories, setCalories] = useState(false);

    const handleHall=(e)=>{
        setHall(e);
    }

    const handleMeal=(e)=>{
        setMeal(e);
    }

    return (
        <div class={styles.filterBar}>
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

            <form> 
                <label>
                    <input
                        type="checkbox"
                        checked={allergens}
                        onChange={e => setAllergens(e.target.checked)}
                    />
                    <span class={styles.label}>Filter by Dietary Restrictions</span>
                </label>
            </form>

            <form> 
                <label>
                    <input
                        type="checkbox"
                        checked={calories}
                        onChange={e => setCalories(e.target.checked)}
                    />
                    <span class={styles.label}>Filter by Daily Calorie Goal</span>
                </label>
            </form>

            <button class={styles.button}>Find Food</button>

        </div>
    )
}