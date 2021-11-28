import React, { useState} from 'react';
import { renderMatches } from 'react-router';
import styled from "styled-components";
import NavBar from "../navbar.js"

const ProfileDiv = styled.div`
display: grid;
grid-template-columns: 45% 55%;
min-height: 300px;
padding: 25px;
`;

const Image = styled.div`
  object-fit: cover;
  background-image: url(https://pbs.twimg.com/profile_images/974674764575866880/MwF1DQZ-_400x400.jpg);
  background-position: center;
  background-size: cover;
  width: 80%;
  height: 200%;
`;

const TextDiv = styled.div`
display: grid;
grid-template-rows: auto auto auto;
font-family: Helvetica;
`;

async function getUserData(credentials) {
  return fetch('http://localhost:8080/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Dashboard({un}) {
  const [dietaryRestrictions, setDietaryRestrictions] = useState();
  const [calories, setCalories] = useState();
  /* const token = await getUserData({
    {un}});
    fetch('http://localhost:8080/user')
    .then(response => response.json())
    .then(data => {}); */
  return(
      <div>
        <NavBar/>
        <h2>Your Profile</h2>
        <ProfileDiv> 
          <Image> </Image>
          <TextDiv>
            <h3> <strong>{un}</strong> </h3>
            <h3> <strong>Dietary Restrictions:</strong> {dietaryRestrictions} </h3>
            <h3> <strong>Daily Calorie Goal:</strong> {calories} </h3>
          </TextDiv>
        </ProfileDiv>
      </div>
  );
}