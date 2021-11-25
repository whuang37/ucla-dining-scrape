import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";


export default function Filter(props) {
    return (
        <div>
            <Dropdown class={styles.dropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Dining Hall
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Bruin Plate</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">De Neve</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Epicuria</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Meal
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-4">Breakfast</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">Lunch</Dropdown.Item>
                    <Dropdown.Item href="#/action-6">Dinner</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}