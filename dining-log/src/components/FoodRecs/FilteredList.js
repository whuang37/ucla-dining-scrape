import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";
import FoodList from "./FoodList";

// TODO: get link to fetch from
async function getFoods(filters) {
    return fetch('http://localhost:8080/foodfilter', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters)
    })
    .then(data => data.json())
}

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.setSelected.bind(this);
        this.middle.bind(this);
        this.state = {
            meal: 'Meal',
            hall: 'Dining Hall',
            allergens: false,
            calories: false,
            selectedFoods: [],
            displayFoods: [],   //displayFoods = data.foods + selectedFoods
            total: 0,
            usercalories: 0,
        };
    } 

    async componentDidMount() {
        await this.middle();
    }


    async componentDidUpdate(prevProps, prevState){
        if (this.state.meal !== prevState.meal || this.state.hall !== prevState.hall || this.state.allergens !== prevState.allergens 
            || this.state.calories !== prevState.calories 
            || JSON.stringify(this.state.selectedFoods) !== JSON.stringify(prevState.selectedFoods)) 
        {
            await this.middle();
            this.mergeFoods();
        }
    }
    

    async middle() {
        await getFoods({
            meal: this.state.meal,
            hall: this.state.hall,
            username: sessionStorage.getItem('username'),
            selectedFoods: this.state.selectedFoods,
            allergens: this.state.allergens,
            calories: this.state.calories,
        }) 

        fetch('http://localhost:8080/query')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    displayFoods: data.foods
                }) 
            });
    }
    
    // callback function to add foodItem to array of selectedFoods: pass function to foodlist --> fooditem as a prop, call callback function from foodItem with food object as argument to add it to the array of selectedFoods
    setSelected=(food, selected)=>{
        // add food to selectedList if checkbox is checked
        if (selected)
            this.setState((state)=>({
                selectedFoods: [...state.selectedFoods, food]
            }));
        // remove food from list if checkbox got unchecked
        else
        {
            const curr = this.state.selectedFoods;
            const index = curr.map(e => e.name).indexOf(food.name);
            if (index !== -1)
            {
                curr.splice(index, 1);
                this.setState({
                    selectedFoods: curr
                });
            }
        }
        this.calculateCalories();
    }

    calculateCalories=()=>{
        this.setState((state)=>({
            total: state.selectedFoods.reduce((a,v) =>  a = a + v.calories, 0),
        }));
    }

    // displayFoods = data.foods + selectedFoods
    mergeFoods() {
        let display = this.state.displayFoods
        let selected = this.state.selectedFoods
        for(var i = 0, l = display.length; i < l; i++) {
            for(var j = 0, ll = selected.length; j < ll; j++) {
                if(display[i].name === selected[j].name) {
                    display.splice(i, 1, selected[j]);
                    break;
                }
            }
        }
        this.setState({
            displayFoods: display 
        }) 
    }

    render() {
        return (
            <div>
                <div class={styles.filterBar} onChange={this.handleChange}>
                    <Dropdown onSelect={(e) => {this.setState({meal: e})}}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {this.state.meal}
                        </Dropdown.Toggle>
    
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item eventKey="Breakfast">Breakfast</Dropdown.Item>
                            <Dropdown.Item eventKey="Lunch">Lunch</Dropdown.Item>
                            <Dropdown.Item eventKey="Dinner">Dinner</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={(e) => {this.setState({hall: e})}}>
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
    
                <FoodList meal={this.state.meal} hall={this.state.hall} display={this.state.displayFoods} selected={this.state.selectedFoods} setSelected={this.setSelected}/>

                <div>
                    <p>Meal Calories: {this.state.total} </p>
                    <p>Remaining Daily Calories: {this.state.usercalories - this.state.total} </p>
                    <button class={styles.button}>Log Meal</button>
                </div>
            </div>
        )
    }
}