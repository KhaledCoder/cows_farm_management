import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './birth_registration.css';
import Birth_registration_form from './birth_registration_form';

//birth registration page
function Birth_registration() {
    const handleSubmit = (cowData) => {
        console.log('Submitted Cow Data:', cowData);
       
      };
    return (
      <div>
        <Sidebar />
        <div className='content '>
        <h1>New Birth Cow Form</h1>
      <Birth_registration_form onSubmit={handleSubmit} />
 
        </div>
      </div>
      
    );
  };
  
  export default Birth_registration;