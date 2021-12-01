
import styled from "styled-components";
import {  Link } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-family: Helvetica;
    font-size: 20px;
    justify-items: center;
    align-items: center;
    background-color: #C4C4C4;
    width: 100%;
    height: 50px;
    margin-bottom: 2%;
    border-radius: 10px;
`;

export default function NavBar(props) {
    return (
        <NavContainer>
            <div> <Link to="/" style={{ color: 'black', textDecoration: 'none' }}><strong>UCLA Dining Hall Food Log</strong></Link> </div> 
            <div> <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}>Your Profile</Link> </div>
            <div> <Link to="/foodpage" style={{ color: 'black', textDecoration: 'none' }}>Food Logger</Link> </div>
            <div> <Link to="/history" style={{ color: 'black', textDecoration: 'none' }}>Eating History</Link> </div>
        </NavContainer>
    );
}