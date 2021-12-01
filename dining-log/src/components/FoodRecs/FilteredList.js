import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "./Page.module.css";
import FoodList from "./FoodList";

// TODO: need to get user's calorie preferences as a prop
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

async function sendFoods(filters) {
    return fetch('http://localhost:8080/logmeal', {
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
            queryFoods: [],   
            displayFoods: [],
            usercalories: 0,
            total: 0,
            isLogged: false,
        };
    } 

    async componentDidMount() {
        await this.middle();
    }


    async componentDidUpdate(prevProps, prevState){
        console.log("STATES")
        // console.log(prevState.allergens);
        // console.log(this.state.allergens);
        console.log(JSON.stringify(prevState.selectedFoods));
        console.log(JSON.stringify(this.state.selectedFoods));
        console.log("COMPARE STATES")
        console.log(JSON.stringify(this.state.selectedFoods) !== JSON.stringify(prevState.selectedFoods))
        if (this.state.meal !== prevState.meal || this.state.hall !== prevState.hall || this.state.allergens !== prevState.allergens 
            || this.state.calories !== prevState.calories || JSON.stringify(this.state.queryFoods) !== JSON.stringify(prevState.queryFoods) || this.state.isLogged !== prevState.isLogged
            || JSON.stringify(this.state.selectedFoods) !== JSON.stringify(prevState.selectedFoods)) 
        {
            await this.middle();
            this.mergeFoods();
            if(this.state.isLogged)
                setTimeout(() => this.setState({isLogged:false}), 3000);
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
                    usercalories: data.usercalories,
                    queryFoods: data.foods
                }) 
            });
        
        console.log("QUERIED")
    }
    
    // callback function to add foodItem to array of selectedFoods: pass function to foodlist --> fooditem as a prop, call callback function from foodItem with food object as argument to add it to the array of selectedFoods
    setSelected=(food, selected)=>{
        // check if food is already in selected list
        const curr = this.state.selectedFoods;
        const index = curr.map(e => e.name).indexOf(food.name);

        // add food to selectedList if checkbox is checked and not already in list
        if (selected && index === -1)
            this.setState((state)=>({
                selectedFoods: [...state.selectedFoods, food]
            }));
        // remove food from list if checkbox got unchecked
        else
        {
            if (index !== -1)
            {
                curr.splice(index, 1);
                this.setState({
                    selectedFoods: curr
                });
            }
        }
        // setTimeout(() => console.log(this.state.selectedFoods), 3000)
        this.calculateCalories();
        console.log("SELECTION UPDATED")
        console.log(selected)
        //console.log(this.state.selectedFoods)
    }

    calculateCalories=()=>{
        this.setState((state)=>({
            total: state.selectedFoods.reduce((a,v) =>  a = a + v.calories, 0),
        }));
    }

    // displayFoods = data.foods + selectedFoods
    mergeFoods() {
        const query = this.state.queryFoods
        // console.log('before concat, selected foods')
        // console.log(query)
        const selected = this.state.selectedFoods
        // console.log(selected)
        let display = query.concat(selected)
        // console.log('after concat')
        // console.log(display)
        for(var i=0; i<display.length; ++i) {
            for(var j=i+1; j<display.length; ++j) {
                if(display[i].name === display[j].name)
                    display.splice(j--, 1);
            }
        }    
        this.setState({
            displayFoods: display 
        }) 
        // console.log('without duplicates')
        // console.log(this.state.displayFoods)
    }

    async logMeal(){
        this.setState({isLogged:true});
        await sendFoods({username: sessionStorage.getItem('username'), meal:this.state.meal, selectedFoods:this.state.selectedFoods});
    }

    loggedMeal(){
        if(this.state.isLogged)
         return (<div>Logged Meals!</div>);
    }

    render() {
        const filters = {"hall": this.state.hall, "meal": this.state.meal, "allergens": this.state.allergens, "calories": this.state.calories}
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
                </div>
    
                <FoodList meal={this.state.meal} hall={this.state.hall} display={this.state.displayFoods} selected={this.state.selectedFoods} setSelected={this.setSelected} filters={filters}/>

                <div>
                    <p>Meal Calories: {this.state.total} </p>
                    <p>Remaining Daily Calories: {this.state.usercalories - this.state.total} </p>
                    <button onClick={() => this.logMeal()}class={styles.button}>Log Meal</button>
                    {this.loggedMeal()}
                </div>
            </div>
        )
    }
}