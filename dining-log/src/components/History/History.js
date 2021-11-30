import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../navbar"
import MealHistory from "./MealHistory";
import Form from "react-bootstrap/Form";

const HistoryDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  min-height: 500px;
  padding: 25px;
  grid-gap: 25px;
`;

export default function History() {
    const [date, setDate] = useState()
    const [foodList, setFoodList] = useState()
    /* get object from backend using date*/

    return (
        <div>
            <NavBar/>
            <div>
                <Form.Control type="date" name="date"/>
                <HistoryDiv>
                    <MealHistory meal = "breakfast"/>
                    <MealHistory meal = "lunch"/>
                    <MealHistory meal = "dinner"/>
                </HistoryDiv>
            </div>
        </div>
    )
}