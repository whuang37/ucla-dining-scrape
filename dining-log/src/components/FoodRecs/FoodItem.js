import React from "react";
import { useState } from 'react';
import styled from "styled-components";

// TODO: handle the case where there are no allergens

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

    const handleChecked=(e)=>{
        setChecked(e);
        {props.update(e)}
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