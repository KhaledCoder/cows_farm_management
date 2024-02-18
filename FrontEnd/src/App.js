// App.jsx
import React, { useState,useEffect} from 'react';
import './App.css';
import Sidebar from './pages/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import AddNewCow from './pages/add_cow/add_cow';
import  Milk_production_Table from './pages/Milk_production/milk_production.jsx';
import Medical_Examination from './pages/Medical examination/medical_examination';
import Medical_Examination__Ditails from './pages/Medical examination/Medical_examination_ditails/medical_examination_ditails';
import Birth_registration from './pages/Birth registration/birth_registration';
import Milk_Production_Update from './pages/Milk_production/Milk_production_update/milk_production_update';
import Cows_data_change from './pages/Cows_data_change/cows_data_change';

import Dashboard from './pages/DashBoard/dashboard.jsx';



function App() {
 // website Router
 return (
    <div>
    
      <Router>
      <Sidebar />
      <div className='container'>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
        <Routes>
          <Route path="/add-cow" element={<AddNewCow />} />
        </Routes>
        <Routes>
          <Route path="/Milk_production" element={<Milk_production_Table />} />
        </Routes>
        <Routes>
          <Route path="/medical_examination" element={<Medical_Examination />} />
        </Routes>
        <Routes>
          <Route path="/medical_examination_ditails" element={<Medical_Examination__Ditails/>} />
        </Routes>
        <Routes>
          <Route path="/birth_registration" element={<Birth_registration/>} />
        </Routes>
        <Routes>
          <Route path="/milk_production_update" element={<Milk_Production_Update/>} />
        </Routes>
        <Routes>
          <Route path="/cows_data_change" element={<Cows_data_change/>} />
        </Routes>
      </div>
    </Router>
    
    </div>
    
  );
};

export default App;
