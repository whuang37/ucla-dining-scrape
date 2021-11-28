import React from "react";
import styled from "styled-components";
import FoodItem from "./FoodItem";

// get list of all foods from the hall assigned to props.hall
// display all foods (props.name, props.allergens, props.calories)
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
    /* width: auto; */
    border: 1px solid black;
    margin: 2% 2%;
    padding-left: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
`;

export default function List(props) {
    return (
        <div>
            <Container>
                <Header>{props.meal} at {props.hall}</Header>
                <FoodItem name="Salad" allergens="soy, dairy, nuts" calories="227"/>
                <FoodItem name="Brown Rice" allergens="gluten" calories="292"/>
                <FoodItem name="Egg Whites Omelet" allergens="eggs" calories="174"/>
                <FoodItem name="Sandwich" allergens="gluten" calories="800"/>
                <FoodItem name="Grilled Chicken" calories="112"/>
                <FoodItem name="Blueberry Topping" allergens="eggs" calories="41"/>
            </Container>
        </div>
    )
}