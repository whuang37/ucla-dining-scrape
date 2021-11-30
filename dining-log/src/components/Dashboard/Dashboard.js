import styled from "styled-components";
import NavBar from "../navbar"

const ProfileDiv = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  min-height: 300px;
  padding: 25px;
`;

const Image = styled.div`
  height: 100%;
  object-fit: cover;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  width: 75%;
  height: 200%;
`;

const TextDiv = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  font-family: Helvetica;
`;

export default function Dashboard(props) {
  let image = props.image;
  let name = props.name;
  let dietaryRestrictions = props.dietaryRestrictions;
  let calories = props.calories;
  return(
    <div>
      <NavBar/>
      <h2>Your Profile</h2>
      <ProfileDiv> 
        <Image image = {image}/>
        <TextDiv>
          <h3> <strong>{name}</strong> </h3>
          <h3> <strong>Dietary Restrictions:</strong> {dietaryRestrictions} </h3>
          <h3> <strong>Daily Calorie Goal:</strong> {calories} </h3>
        </TextDiv>
      </ProfileDiv>
    </div>
  );
}