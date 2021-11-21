import styled from "styled-components";
import Button from 'react-bootstrap/Button';

const ProfileDiv = styled.div`
display: grid;
grid-template-columns: 40% 60%
`;

const Image = styled.div`
background-image: ${(props) => props.image};
background-position: center;
`;

const TextDiv = styled.div`
font-family: Helvetica;
`;

export default function Dashboard(props) {
  let image = props.image
  let name = props.name
  let dietaryRestrictions = props.dietaryRestrictions
  let calories = props.calories
  return(
    <div>
      <h2>Your Profile</h2>
      <ProfileDiv> 
        <Image image = {image}/>
        <TextDiv>
          <h3> {name} </h3>
          <h3> Dietary Restrictions: {dietaryRestrictions} </h3>
          <h3> Daily Calorie Goal: {calories} </h3>
        </TextDiv>
      </ProfileDiv>
    </div>
  );
}