import styled from "styled-components";
import {Navigate, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const StyledButton = styled(Button)`
    color: black;
    font-size: 20px;
    font-family: Helvetica;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    background-color: #ffc107;
`;

export default function BackToLanding() {
    const nav = useNavigate();

    function back(path) {
        nav(path)
    }

    return(
        <StyledButton onClick = {() => back("/")}>Back</StyledButton>
    );
}