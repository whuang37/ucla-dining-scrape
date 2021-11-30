import React from "react";
import styled from "styled-components";

const Information = styled.div`
    margin-left: 8%;
    text-align: left;
    padding: 5px;
`;

export default function HistoryItem(props) {
    return (
        <div> 
            <div>
                <Information>
                    <div><strong> {props.name} </strong></div>
                    <div><i> Allergens: {props.allergens} </i></div>    
                    <div><i> Calories: {props.calories} </i></div>
                </Information>
            </div>
        </div>
    )
}