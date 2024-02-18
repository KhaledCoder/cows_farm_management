import React, { useState ,useEffect} from 'react';
import './milk_production.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//Milk_production_Table page
const Milk_production_Table = () => {
  const [data, setData] = useState([]);
  const [cowNumber, setCowNumber] = useState('');
  const [motherCowNumber, setMotherCowNumber] = useState('');
  const [entryDate, setentryDate] = useState('');
  const [species, setspecies] = useState('');

  const [searchResults, setSearchResults] = useState(data);
// sum all the Milk Production of single cow to give total milk production of it
  function addTotalMilkProduction(jsonData) {
    jsonData.forEach(entry => {
        let milkProduction = entry["Milkproduction"];
        let totalProduction = milkProduction.reduce((acc, val) => acc + parseInt(val[1]), 0);
        entry["TotalMilkproduction"] = totalProduction;
    });
  }
  //get data from the server
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
  addTotalMilkProduction(data) ///////<======================
  console.log(data)
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
      <h1>Milk production schedule</h1>
    <div className="cow-table-container">
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
            <th>Last Milk Production Record</th>
            <th>Total Milk Production</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((cow, index) => (
            <tr key={index}>
              <td>{cow.cowNumber}</td>
              <td>{cow.motherCowNumber}</td>
              <td>{cow.entryDate}</td>
              <td>{cow.species}</td>
              <td>{cow.Milkproduction[0] && cow.Milkproduction[0][1] ? cow.Milkproduction[0][1] : ""}</td>
              <td>{cow.TotalMilkproduction}</td>
              <td><Link to={`/milk_production_update?data=${JSON.stringify(cow)}`}>Update</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default  Milk_production_Table;
