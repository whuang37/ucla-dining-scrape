import React, { useState, useEffect } from "react";
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

async function sendUserData(credentials) {
    return fetch('http://localhost:8080/save_history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function History() {
    const [date, setDate] = useState()
    const [foodList, setFoodList] = useState({breakfast:[], lunch:[], dinner:[]})
    const [totalCalories, setTotalCalories] = useState()

    useEffect(() => {
        async function middle(){
          await sendUserData({username:sessionStorage.getItem('username'), date:date});
          fetch('http://localhost:8080/get_history')
        .then(response => response.json())
        .then(data => {
          setFoodList(data)});  
        }
      middle();
    
      } ,[date]);

    return (
        <div>
            <NavBar/>
            <div>
                <DateDiv>
                    <input type="date" onChange={e => setDate(e.target.value)}/>
                </DateDiv>
                <HistoryDiv>
                    <MealHistory meal = "Breakfast" display = {foodList.breakfast}/>
                    <MealHistory meal = "Lunch" display = {foodList.lunch}/>
                    <MealHistory meal = "Dinner" display = {foodList.dinner}/>
                </HistoryDiv>
                <CalorieDiv>Total Calories: {totalCalories}</CalorieDiv>
            </div>
        </div>
    )
}