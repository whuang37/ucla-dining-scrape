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
    const [display, setDisplay] = useState(false)

    // only run function after initial render
    useEffect(() => {
        if(props.selected.some(food => props.name === food.name)) 
            setDisplay(true)
        else
            setDisplay(false)
      }, [props.filters]);

    const handleChecked=()=>{
        console.log("CLICKED")
        const curr_check = checked;
        const curr_disp = display;
        setChecked(!curr_check);
        const food = {name: props.name, allergens: props.allergens, calories: props.calories};
        props.setSelected(food, !curr_check);
    }

    // if the item has been selected, make sure the corresponding checkbox stays selected

    return (
        <div> 
            <form> 
                <input
                    type="checkbox"
                    checked={display}
                    onChange={() => handleChecked()}
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