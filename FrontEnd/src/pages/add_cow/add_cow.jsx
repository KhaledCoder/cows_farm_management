import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './add_cow_style.css';
import CowForm from './cowform';
//add cow page
function Add_new_cow() {
    const handleSubmit = (cowData) => {
        console.log('Submitted Cow Data:', cowData);
        
      };
    return (
      <div className='content'>
        
        <div >
        <h1>Add new cow</h1>
      <CowForm onSubmit={handleSubmit} />
 
        </div>
      </div>
      
    );
  };
  
  export default Add_new_cow;