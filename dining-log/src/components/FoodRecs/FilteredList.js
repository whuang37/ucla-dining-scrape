import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";
import FoodList from "./FoodList";

// TODO: get link to fetch from
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

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelected.bind(this);
        this.state = {
            meal: 'Meal',
            hall: 'Dining Hall',
            allergens: false,
            calories: false,
            selectedFoods: [],
            displayFoods: [],   //displayFoods = data.response + selectedFoods
        };
    } 
    // tester array
    foods = 
    [{
        "name": "Salad",
        "allergens": "soy, dairy, nuts",
        "calories": 218 },
    {
        "name": "Brown rice",
        "allergens": "gluten",
        "calories": 175 },
    {
        "name": "Egg Whites Omelet",
        "allergens": "eggs",
        "calories": 174 },
    {
        "name": "Prosciutto Sandwich",
        "allergens": "gluten",
        "calories": 800 },
    {
        "name": "Grilled Chicken",
        "calories": 112 },
    {
        "name": "Blueberry Topping",
        "calories": 41 }
    ]

    handleMeal=(e)=>{
        this.setState({
            meal: e
        });
    }

    handleHall=(e)=>{
        this.setState({
            hall: e
        });
    }

    updateSelected=(e)=>{
        this.setState({
            selectedFoods: this.selectedFoods.concat(e)
        });
    }

    // callback function (to add foodItem to array of selectedFoods): pass function down to foodlist --> fooditem as a prop, bind checked state to function and pass fooditem back up to filteredList so we can add it to the array of selectedFoods

    // object {name, allergens, calories}
    
    handleChange = async e => {
        e.preventDefault();
    
        const token = await filter({
          meal: this.state.meal,
          hall: this.state.hall,
          allergens: this.state.allergens,
          calories: this.state.calories,
          selectedFoods: this.state.selectedFoods
        });

        // TODO: get link to fetch from
        fetch('http://localhost:8080/auth')
        .then(response => response.json())
        .then(data => {
            // TODO: fill this part in 
        });
    }

    render() {
        return (
            <div>
                <div class={styles.filterBar} onChange={this.handleChange}>
                    <Dropdown onSelect={this.handleMeal}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {this.state.meal}
                        </Dropdown.Toggle>
    
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item eventKey="Breakfast">Breakfast</Dropdown.Item>
                            <Dropdown.Item eventKey="Lunch">Lunch</Dropdown.Item>
                            <Dropdown.Item eventKey="Dinner">Dinner</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={this.handleHall}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {this.state.hall}
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
                                checked={this.state.allergens}
                                onClick={() => {this.setState({allergens: !this.state.allergens})}}
                            />
                            <span class={styles.label}>Filter by Dietary Restrictions</span>
                        </label>
                    </form>
    
                    <form> 
                        <label>
                            <input
                                type="checkbox"
                                checked={this.state.calories}
                                onClick={() => {this.setState({calories: !this.state.calories})}}
                            />
                            <span class={styles.label}>Filter by Daily Calorie Goal</span>
                        </label>
                    </form>
    
                    <button class={styles.button} type="submit">Find Food</button>
                </div>
    
                {/* props should be display={displayFoods} and selected={selectedFoods} */}
                <FoodList meal={this.state.meal} hall={this.state.hall} display={this.foods} selected={this.state.selectedFoods} update={this.updateSelected}/>
                
            </div>
        )
    }
}