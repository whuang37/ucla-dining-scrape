import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../navbar"
import MealHistory from "./MealHistory";

const DateDiv = styled.div`
    display: grid;
    place-items: center;
`;

const HistoryDiv = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    grid-gap: 25px;
`;

const CalorieDiv = styled.div`
    display: grid;
    place-items: end;
    padding-right: 25px;
    font-size: 24px;
`;

export default function History() {
    const [date, setDate] = useState()
    const [foodList, setFoodList] = useState()
    const [totalCalories, setTotalCalories] = useState()
    let breakfast = []
    let lunch = [
        {
            "name": "Salad",
            "allergens": "soy, dairy, nuts",
            "calories": 218
        },
        {
            "name": "Brown rice",
            "allergens": "gluten",
            "calories": 175
        },
        {
            "name": "Egg Whites Omelet",
            "allergens": "eggs",
            "calories": 174
        },
        {
            "name": "Prosciutto Sandwich",
            "allergens": "gluten",
            "calories": 800
        },
        {
            "name": "Grilled Chicken",
            "calories": 112
        },
        {
            "name": "Blueberry Topping",
            "calories": 41
        }
    ]
    let dinner = [
    {
        "name": "Salad",
        "allergens": "soy, dairy, nuts",
        "calories": 218
    },
    {
        "name": "Brown rice",
        "allergens": "gluten",
        "calories": 175
    },
    {
        "name": "Egg Whites Omelet",
        "allergens": "eggs",
        "calories": 174
    },
    {
        "name": "Prosciutto Sandwich",
        "allergens": "gluten",
        "calories": 800
    },
    {
        "name": "Grilled Chicken",
        "calories": 112
    },
    {
        "name": "Blueberry Topping",
        "calories": 41
    }
]
    /* get object from backend using user and date (in form yyyy-mm-dd) and set as foodList */
    /* pass foodList[breakfast], foodList[lunch], and foodList[dinner] as display to MealHistory */

    return (
        <div>
            <NavBar/>
            <div>
                <DateDiv>
                    <input type="date" onChange={e => setDate(e.target.value)}/>
                </DateDiv>
                <HistoryDiv>
                    <MealHistory meal = "Breakfast" display = {breakfast}/>
                    <MealHistory meal = "Lunch" display = {lunch}/>
                    <MealHistory meal = "Dinner" display = {dinner}/>
                </HistoryDiv>
                <CalorieDiv>Total Calories: {totalCalories}</CalorieDiv>
            </div>
        </div>
    )
}