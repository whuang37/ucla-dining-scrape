import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import NewUser from './components/NewUser/NewUser';

import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";

function App() {
  const [token, setToken] = useState();
  if(!token) {
    // return <Login setToken={setToken} />
    return <Dashboard name = "Student" dietaryRestrictions = "vegan" calories = "2000" image = "https://1000logos.net/wp-content/uploads/2017/11/Logo-UCLA.jpg"></Dashboard>
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
