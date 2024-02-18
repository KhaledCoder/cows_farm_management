import React, { useState,useEffect } from 'react';
import './cowformstyle.css';

//add cow form
function CowForm() {
  const[suggestCowNumber,setsuggestCowNumber]=useState('');
  const [cowNumber, setCowNumber] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [species, setspecies] = useState('');
  const [response, setResponse] = useState('');
  ////////////////susggest cow number from the server///////
 
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/susggestCowNumber',{
        method: 'POST',
      })
      const result = await response.text();
      setsuggestCowNumber(result);
      console.log("result",result)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  
  




useEffect(() => {
  fetchData();
  }, []);


  ///////////////
  
  
  
  
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
      setResponse("you need to enter Entry Date");
    }else if(species ==""){
      setResponse("you need to enter Species");
    }else{
      ////send data to the server
    const formData = {
      cowNumber,
      entryDate,
      species
    };
    try {
      const response = await fetch('http://localhost:3001/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:formData}),
      });
      const data = await response.text();
      setResponse(data);
      fetchData()
    } catch (error) {
      console.error('Error:', error);
    }
  
}};
  
////html code
  return (
    <div className="cow-form">
      <p>suggested Cow Number : {suggestCowNumber}</p>
      <label>
        Cow Number:
        <input
          type="text"
          value={cowNumber}
          onChange={(e) => setCowNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Entry Date:
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />
      </label>
      <br />
      <label>
       species:
        <input
          type="text"
          value={species}
          onChange={(e) => setspecies(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleClick} >Submit</button>
      <p>{response}</p>
    </div>
  );
}

export default CowForm;