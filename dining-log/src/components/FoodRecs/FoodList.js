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

// props = meal, hall, display {name, allergens, calories}
export default function List(props) {
    // foodList is an array of FoodItems
    console.log(props.display)
    
    const foodList = props.display.map(function(foods){
        let allergens;
        let checked;
        if (foods.allergens === undefined)
            allergens = []
        else if (typeof foods.allergens === "string")
            allergens = foods.allergens
        else 
        {
            allergens = Object.values(foods.allergens)
            allergens = allergens.join(", ")
        }

        console.log(foods)
        console.log(foods._id)

        if (foods._id === undefined)
            checked = true
        else
            checked = false

        return <div> 
            <FoodItem name={foods.name} allergens={allergens} calories={foods.calories} setSelected={props.setSelected} 
                    checked={checked}/> 
        </div>;
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