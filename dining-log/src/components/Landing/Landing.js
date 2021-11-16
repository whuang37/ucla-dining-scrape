import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

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

const StyledButton = styled(Button)`
font-size: 32px;
font-family: Helvetica;
border: none;
border-radius: 15px;
`;

const LoginButton = styled(StyledButton)`
background-color: #3C99EF;
`;

const SignUpButton = styled(StyledButton)`
background-color: #F5D52D;
`;

export default function Landing(props) {
    return (
        <div>
            <Text>
                UCLA Dining Hall Food Log
            </Text>
            <ButtonDiv>
                <LoginButton>Login</LoginButton>
                <SignUpButton>Sign Up</SignUpButton>
            </ButtonDiv>
        </div>
      );
}