import React, { useState } from "react";
import styled from "styled-components";

const MealDiv = styled.div`
    background-color: #C4C4C4;
    text-align: center;
`;

export default function MealHistory(props) {
    const [calories, setCalories] = useState()

    return(
        <MealDiv>
            <h2>{props.meal}</h2>

        </MealDiv>
    );
}