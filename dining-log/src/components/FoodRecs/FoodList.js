import React from "react";
import styled from "styled-components";
import FoodItem from "./FoodItem";

// get list of all foods from the hall assigned to props.hall
// display all foods (props.list.name, props.list.allergens, props.list.calories)
// loop through array of all foods

const Header = styled.div`
    font-family: Helvetica;
    text-align: center;
    font-size: 40px;
    grid-column: 1 / span 3;
    justify-self: center;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 5px;
    justify-content: center;
    border: 1px solid black;
    margin: 2% 2%;
    padding-left: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
`;

// props = meal, hall, array of food objects {name, allergens, calories}
export default function List(props) {
    const foodList = props.display.map(function(foods){
        return <div> <FoodItem name={foods.name} allergens={foods.allergens} calories={foods.calories} 
                        setSelected={props.setSelected}/> </div>;
    })

    return (
        <div>
            <Container>
                <Header>{props.meal} at {props.hall}</Header>
                {foodList}
            </Container>
        </div>
    )
}