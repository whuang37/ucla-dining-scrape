import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Navigate} from 'react-router-dom';

const Text = styled.div`
    font-family: Helvetica;
    text-align: center;
    font-size: 64px;
    padding-top: 175px;
    padding-bottom: 25px;
`;

const ButtonDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 75px;
    grid-gap: 100px;
`;

const StyledButton = styled.button`
    font-size: 32px;
    font-family: Helvetica;
    border: none;
    border-radius: 15px;
    color: white;
`;

const LoginButton = styled(StyledButton)`
    background-color: #3C99EF;
`;

const SignUpButton = styled(StyledButton)`
    background-color: #F5D52D;
`;

export default function Landing(props) {

    const [button, setButton] = useState();

    if(button == 'login')
        return <Navigate to="/login" />;
    else if (button == 'signup')
        return <Navigate to="/signup" />;

    let login = () => {setButton('login');};
    let signup = () => {setButton('signup');};
    
    return (
        <div>
            <Text>
                UCLA Dining Hall Food Log
            </Text>
            <ButtonDiv>
                <LoginButton onClick={login}>Login</LoginButton>
                <SignUpButton onClick={signup}>Sign Up</SignUpButton>
            </ButtonDiv>
        </div>
    );
    
}