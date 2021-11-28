import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavContainer = styled(Container)`
    font-family: Helvetica;
    text-align: center;
    background-color: #C4C4C4;
    width: 100%;
`;

const StyledNav = styled(Nav)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: left;
    padding-left: 75px; 
`;

export default function NavBar(props) {
    return (
        <Navbar expand="lg">
            <NavContainer>
                <Navbar.Brand href="home">Dining Hall Food Log</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <StyledNav>
                    <Nav.Link to="/dashboard">Your Profile</Nav.Link>
                    <Nav.Link to="/history">Eating History</Nav.Link>
                    <Nav.Link to="/logger">Meal Logger and Planner</Nav.Link>
                </StyledNav>
                </Navbar.Collapse>
            </NavContainer>
        </Navbar>
    );
}