import React from "react";
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

    const handleChecked=()=>{
        setChecked(!checked);
        const food = {name: props.name, allergens: props.allergens, calories: props.calories};
        props.setSelected(food, !checked);
    }

    return (
        <div> 
            <form> 
                <input
                    type="checkbox"
                    checked={checked}
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