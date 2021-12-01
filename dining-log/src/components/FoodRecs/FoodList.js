import React, { useEffect } from "react";
import { useState } from 'react';
import styled from "styled-components";
import FoodItem from "./FoodItem";

const Header = styled.div`
    font-family: Helvetica;
    text-align: center;
    font-size: 40px;
    grid-column: 1 / span 3;
    justify-self: center;
    letter-spacing: .1rem;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 5px;
    justify-content: center;
    border: 3px solid #1A66DE;
    border-radius: 0.5rem;
    margin: 2% 2%;
    padding-left: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
`;

// props = meal, hall, display {name, allergens, calories}
export default function List(props) {
    // foodList is an array of FoodItems
    const foodList = props.display.map(function(foods){
        let allergens;
        if (foods.allergens === undefined)
            allergens = []
        else if (typeof foods.allergens === "string")
            allergens = foods.allergens
        else 
        {
            allergens = Object.values(foods.allergens)
            allergens = allergens.join(", ")
        }
        return <div> 
            <FoodItem name={foods.name} allergens={allergens} calories={foods.calories} setSelected={props.setSelected} 
                    selected={props.selected} filters={props.filters}/> 
        </div>;
    })

    console.log(foodList);


    return (
        <div>
            <Container>
                <Header>{props.meal} at {props.hall}</Header>
                {foodList}
            </Container>
        </div>
    )
}