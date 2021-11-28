import React, { useState } from "react";
import styled from "styled-components"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

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
    /* width: 10%; */
`;

async function signUser(credentials) {
    return fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function NewUser({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await signUser({
        username,
        password
      });
      setToken(token);
    }

    return(
        <div>
            <Header>Welcome</Header>
            <FormWrapper>
                <Form.Group className="mb-3" controlId="signUpForm">
                    <FieldWrapper><Form.Control type="email" placeholder="Email" inputRef={ref => setUserName(ref.value)}  /></FieldWrapper>
                    <FieldWrapper><Form.Control type="password" placeholder="Password" inputRef={ref => setPassword(ref.value)}  /></FieldWrapper>
                </Form.Group>
            </FormWrapper>
            <StyledButton type="submit"> Sign Up </StyledButton>
        </div>
    );
}

NewUser.propTypes = {
    setToken: PropTypes.func.isRequired
  };




