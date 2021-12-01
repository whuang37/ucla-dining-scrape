import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import NavBar from "../navbar"

const TitleDiv = styled.div`
  padding-left: 30px;
  font-family: Helvetica;
  font-size: 40px;
  text-align: center;
`

const ProfileDiv = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  min-height: 500px;
  padding: 25px;
`;

const Image = styled.div`
  object-fit: cover;
  background-image: url(https://pbs.twimg.com/profile_images/974674764575866880/MwF1DQZ-_400x400.jpg);
  background-position: center;
  background-size: cover;
  width: 80%;
  height: 100%;
  border-radius: 10px;
`;

const TextDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 25px;
  font-family: Helvetica;
  align-items: center;
`;

const SectionDiv1 = styled.div`
  background-color: #3C99EF;
  border-radius: 10px;
  padding: 25px;
`

const SectionDiv2 = styled.div`
  background-color: #D5AD36;
  border-radius: 10px;
  padding: 25px;
`

const SectionDiv3 = styled.div`
  background-color: #CD9703;
  border-radius: 10px;
  padding: 25px;
`

async function sendUserData(credentials) {
  return fetch('http://localhost:8080/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Dashboard() {
  const [dietaryRestrictions, setDietaryRestrictions] = useState();
  const [calories, setCalories] = useState();
  const [user, setUsername] = useState();
  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
    async function middle(){
      await sendUserData({username:user});
      fetch('http://localhost:8080/profile')
    .then(response => response.json())
    .then(data => {
      setDietaryRestrictions(data.allergens.join(', ')); setCalories(data.calories);});  
    }
  middle();

  } ,[user]);
  

      return(
      <div>
        <NavBar/>
        <TitleDiv><strong>Your Profile</strong></TitleDiv>
        <ProfileDiv> 
          <Image> </Image>
          <TextDiv>
            <SectionDiv1><h2> <strong>Welcome, {user}!</strong> </h2></SectionDiv1>
            <SectionDiv2><h3> <strong>Dietary Restrictions:</strong> {dietaryRestrictions} </h3></SectionDiv2>
            <SectionDiv3><h3> <strong>Daily Calorie Goal:</strong> {calories} </h3></SectionDiv3>
          </TextDiv>
        </ProfileDiv>
      </div>
  );
}