import React, { useState,useEffect } from 'react';
import './medical_examination.css';
import Medical_Examination__Ditails from './Medical_examination_ditails/medical_examination_ditails';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



//Medical_Examination table
const Medical_Examination = () => {
  const [data, setData] = useState([]);
  const [cowNumber, setCowNumber] = useState('');
  const [motherCowNumber, setMotherCowNumber] = useState('');
  const [entryDate, setentryDate] = useState('');
  const [species, setspecies] = useState('');
  const [searchResults, setSearchResults] = useState(data);
  ///get data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/getAllData');
      const result = await response.json();
      setData(result);
      console.log(data);
      setSearchResults(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


///function to search in table for form inputs data
  const handleSearch = () => {
    console.log(entryDate)
   
    const results = data.filter(cow =>
      cow.cowNumber.toLowerCase().includes(cowNumber.toLowerCase()) &&
      cow.motherCowNumber.toLowerCase().includes(motherCowNumber.toLowerCase()) &&
      cow.species.toLowerCase().includes(species.toLowerCase()) &&
      cow.entryDate.toLowerCase().includes(entryDate.toLowerCase())
    );
   
    setSearchResults(results);
  };

  //html code
  return (
    <div className='content'>
    <div className="cow-table-container">
    <h1>medical examination schedule</h1>
      <div className="search-container">
        Cow Number:
        <input
          type="text"
          placeholder="Search by Cow Number"
          value={cowNumber}
          onChange={(e) => setCowNumber(e.target.value)}
          className="search-input"
        />
        Mother Cow Number:
        <input
          type="text"
          placeholder="Search by Mother Cow Number"
          value={motherCowNumber}
          onChange={(e) => setMotherCowNumber(e.target.value)}
          className="search-input"
        />
        <br/>
        Entry Date:
        <input
         
          type="date"
          placeholder="Search by Entry Date"
          value={entryDate}
          onChange={(e) => setentryDate(e.target.value)}
          className="search-input"
        />
        Species:
        <input
          type="text"
          placeholder="Search by Species"
          value={species}
          onChange={(e) => setspecies(e.target.value)}
          className="search-input"
        />
        <br/>
        
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="cow-table">
        <thead>
          <tr>
            <th>Cow Number</th>
            <th>Mother Cow Number</th>
            <th>Entry Date</th>
            <th>Species</th>
            <th>Last Medical Examination</th>
            <th>view Medical Examination</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((cow, index) => (
            <tr key={index}>
              <td>{cow.cowNumber}</td>
              <td>{cow.motherCowNumber}</td>
              <td>{cow.entryDate}</td>
              <td>{cow.species}</td>
              <td>{cow.Medicalexamination[0] && cow.Medicalexamination[0][0] ? cow.Medicalexamination[0][0] : ""}</td>
              <td><Link to={`/medical_examination_ditails?data=${JSON.stringify(cow)}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
  );
};

export default Medical_Examination;
