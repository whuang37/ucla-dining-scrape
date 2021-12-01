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
    grid-template-columns: 1fr 1fr 1fr;
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
    return fetch('http://localhost:8080/show_history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function History() {
  var today = new Date();

      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(day <= 9)
        day = '0' + day;
      var d = year + "-" + month + "-" + day;
    const [date, setDate] = useState(d);

    const [foodList, setFoodList] = useState({breakfast:[], lunch:[], dinner:[]})

    useEffect(() => {
      async function middle(){
          await sendUserData({username:sessionStorage.getItem('username'), date:date});
          fetch('http://localhost:8080/get_history')
        .then(response => response.json())
        .then(data => {
          setFoodList(data)});  
      }
      middle();
      console.log(date);
      } ,[date]);

    function getTotalCalories(foodList) {
      let total = 0;
      for (let meal in foodList) {
        for (let item in foodList[meal]) {
            total += foodList[meal][item]["calories"]
        }
      }
      return total
    }

    return (
        <div>
            <NavBar/>
            <div>
                <DateDiv>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                </DateDiv>
                <HistoryDiv>
                    <MealHistory meal = "Breakfast" color = "#CD9703" display = {foodList.breakfast}/>
                    <MealHistory meal = "Lunch" color = "#D5AD36" display = {foodList.lunch}/>
                    <MealHistory meal = "Dinner" color = "#3C99EF" display = {foodList.dinner}/>
                </HistoryDiv>
                <CalorieDiv>Total Calories: {getTotalCalories(foodList)}</CalorieDiv>
            </div>
        </div>
    )
}