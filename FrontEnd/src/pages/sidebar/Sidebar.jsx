import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  //make side bar
  return (
    <div className="sidebar">
      <div><h3>Cows Farm Management System</h3></div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add-cow">Add new cow</Link>
      <Link to="/Milk_production">Milk production schedule</Link>
      <Link to="/medical_examination">Medical examination schedule</Link>
      <Link to="/birth_registration">Birth registration</Link>
      <Link to="/cows_data_change">Cows data change</Link>
    </div>
  );
}

export default Sidebar;