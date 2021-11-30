import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import SignUp from './components/SignUp/SignUp';
import FoodPage from "./components/FoodRecs/FoodPage";
import Landing from "./components/Landing/Landing";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render (){
    return(
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/foodpage" element={<FoodPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>);
  }
}
