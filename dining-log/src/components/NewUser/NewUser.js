import React from "react";
import styled from "styled-components"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = styled.h1`
    font-family: Arial, Helvetica, sans-serif;   
    font-size: 48px; 
    text-align: center;
    margin: 5% auto 2% auto;
`;

const FormWrapper = styled(Form)`
    margin: auto;
    width: 40%;
`;

const FieldWrapper = styled.div`
    padding: 10px;
`;

const StyledButton = styled(Button)`
    background-color: #F5D52D;
    display: block;
    margin: auto;
`;

export default function NewUser() {
    return(
        <div>
            <Header>Welcome</Header>
            <FormWrapper>
                <Form.Group className="mb-3" controlId="signUpForm">
                    <FieldWrapper><Form.Control type="email" placeholder="Email" /></FieldWrapper>
                    <FieldWrapper><Form.Control type="password" placeholder="Password" /></FieldWrapper>
                    <FieldWrapper><Form.Control type="password" placeholder="Confirm Password" /></FieldWrapper>
                </Form.Group>
            </FormWrapper>
            <StyledButton type="submit"> Sign Up </StyledButton>
        </div>
    );
}






