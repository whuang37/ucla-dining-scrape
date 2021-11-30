import React, { useEffect } from "react";
import { useState } from 'react';
import styled from "styled-components";

const FoodName = styled.span`
    font-weight: bold;
    padding-left: 2%;
`;

const Information = styled.div`
    margin-left: 8%;
    text-align: left;
    font-style: italic;
`;

export default function Item(props) {
    const [checked, setChecked] = useState(false);
    const [displayChecked, setDisplayChecked] = useState(props.checked)

    console.log(props.name)
    console.log(props.checked)

    const handleChecked=()=>{
        const curr = checked;
        setChecked(!checked);
        const food = {name: props.name, allergens: props.allergens, calories: props.calories};
        props.setSelected(food, !curr);
    }


    return (
        <div> 
            <form> 
                <input
                    type="checkbox"
                    // checked={displayChecked}
                    onChange={handleChecked}
                />
                <FoodName>{props.name}</FoodName>
            </form>
            <div>
                <Information>
                    <div>Allergens: {props.allergens} </div>    
                    <div>Calories: {props.calories}</div>
                </Information>
            </div>
        </div>
    )
}