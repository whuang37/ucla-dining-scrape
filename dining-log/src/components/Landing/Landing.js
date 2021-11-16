import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Text = styled.div`
text-align: center;
font-size: 128;
color: black;
padding-top: 20px;
padding-bottom: 10px;
`;

const ButtonDiv = styled.div`
display: grid
grid-template-columns: 50% 50%;

`;

const Button = styled.button`

`;

export default function Landing(props) {
    return (
        <div>
            <Text>
                UCLA Dining Hall Food Log
            </Text>
            <ButtonDiv>
                <Button>Login</Button>
                <Button>Sign Up</Button>
            </ButtonDiv>
        </div>
      );
}