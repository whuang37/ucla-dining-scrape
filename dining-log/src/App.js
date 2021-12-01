import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import SignUp from './components/SignUp/SignUp';
import FoodPage from "./components/FoodRecs/FoodPage";
import Landing from "./components/Landing/Landing";
import History from "./components/History/History";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

// need to get user's dailyCalories and username as a prop for FoodPage

  render (){
    return(
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/foodpage" element={<FoodPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>);
  }
}
