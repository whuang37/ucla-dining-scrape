import React, { useState } from "react";
import styled from "styled-components";
import HistoryItem from "./HistoryFoodItem";

const MealDiv = styled.div`
    background-color: #C4C4C4;
    text-align: center;
    height: 475px;
    padding: 10px;
`;

const FoodListDiv = styled.div`
    background-color: #C4C4C4;
    text-align: center;
    height: 375px;
    overflow: scroll;
`;

const CalorieDiv = styled.div`
    display: grid;
    place-items: center;
    padding: 5px;
`;

export default function MealHistory(props) {
    let calories = 0;

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
        
        calories += foods.calories

        return <div> 
            <HistoryItem name={foods.name} allergens={allergens} calories={foods.calories}/> 
        </div>;
    })
    
    return(
        <MealDiv>
            <h2>{props.meal}</h2>
            <FoodListDiv>
                {foodList}
            </FoodListDiv>
            <CalorieDiv>Calories: {calories}</CalorieDiv>
        </MealDiv>
    );
}