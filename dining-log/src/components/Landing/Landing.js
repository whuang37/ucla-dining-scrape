import React, { useState } from "react";
import styled from "styled-components";
import {Navigate} from 'react-router-dom';

const Welcome = styled.div`
    font-family: 'Open Sans Condensed', sans-serif;
    text-align: center;
    font-size: 80px;
    margin: 12% auto 2% auto;
    color: black;
    font-weight: 500;
`;

const ButtonDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 75px;
    grid-gap: 100px;
    width: 100%;
`;

const StyledButton = styled.button`
    font-size: 32px;
    font-family: Helvetica;
    border: none;
    border-radius: 15px;
    padding: 20px;
    color: white;
`;

export default function Landing(props) {

    const [button, setButton] = useState();

    if(button === 'login')
        return <Navigate to="/login" />;
    else if (button === 'signup')
        return <Navigate to="/signup" />;

    let login = () => {setButton('login');};
    let signup = () => {setButton('signup');};
    
    return (
        <div>
            <Welcome>
                UCLA Dining Hall Food Log
            </Welcome>
            <ButtonDiv>
                <StyledButton onClick={login} style={{backgroundColor: "#1C87E4"}}>Login</StyledButton>
                <StyledButton onClick={signup} style={{backgroundColor: "#F2C118"}}>Sign Up</StyledButton>
            </ButtonDiv>
        </div>
    );
    
}