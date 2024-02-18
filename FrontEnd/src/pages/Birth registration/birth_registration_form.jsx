import React, { useState } from 'react';
import './birth_registration_form.css';
//Birth registration form
function Birth_registration_form() {
  const [cowNumber, setCowNumber] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [response, setResponse] = useState('');

  // function to be sure that cowNumber from client is natural number
  function isNaturalNumber(str) {
    var naturalNumber = /^(0*[1-9]\d*|0)$/;
    return naturalNumber.test(str);
  }
// whene click submit be sure that all form inputs are not empty
  const handleClick = async () => {
    if(cowNumber ==""){
      setResponse("you need to enter Cow Number");
    } else if(!(isNaturalNumber(cowNumber))){
      setResponse("Cow Number must be natural number");
    }else if(entryDate ==""){
      setResponse("you need to enter Birth Date");
    }else{

    //send to server
    const formData = {
      cowNumber,
      entryDate,
    };
    try {
      const response = await fetch('http://localhost:3001/savenewcowbirth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:formData}),
      });
      const  tryit  = formData;
      console.log(tryit)
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
    }
  };
  
//html code
  return (
    <div className="cow-form">
      <label>
        Mother Cow Number:
        <input
          type="text"
          value={cowNumber}
          onChange={(e) => setCowNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Birth Date:
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />
      </label>
      
      <br />
      <button onClick={handleClick} >Submit</button>
      <p>{response}</p>
    </div>
  );
}

export default Birth_registration_form;