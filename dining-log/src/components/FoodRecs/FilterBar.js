import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styles from "./Page.module.css";
import { useState } from 'react';

// should filter button be disabled until the user chooses a dining hall and meal??

export default function Filter(props) {
    const [allergens, setAllergens] = useState(false);
    const [calories, setCalories] = useState(false);
    return (
        <div class={styles.filterBar}>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Dining Hall
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">  
                    <Dropdown.Item href="#/action-1">Bruin Plate</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">De Neve</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Epicuria</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Select Meal
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item href="#/action-4">Breakfast</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">Lunch</Dropdown.Item>
                    <Dropdown.Item href="#/action-6">Dinner</Dropdown.Item>
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

            <Button variant="outline-success" size="sm">Find Food</Button>

        </div>
    )
}