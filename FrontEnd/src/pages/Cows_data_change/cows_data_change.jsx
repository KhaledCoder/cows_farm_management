import React, { useState ,useEffect} from 'react';
import Table from './table';
//change cow data page
const Cows_data_change = () =>{ 
    
    const [tableData, setTableData] = useState([]);
    const [cowNumberFilter, setCowNumberFilter] = useState('');
    const [entryDateFilter, setEntryDateFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    // get data from the server
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/getAllData');
          const result = await response.json();
          result.forEach(element => {
            element["oldcowNumber"] = element.cowNumber
          });
          
          setTableData(result);
          console.log(tableData);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
      console.log(tableData)
    // functions to handle  changes of the table
    const handleDelete = (index) => {
      setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };
  
    const handleUpdate = (index, newData) => {
      setTableData((prevData) =>
        prevData.map((row, i) => (i === index ? newData : row))
      );
    };
  
    const handleCowNumberChange = (e) => {
      setCowNumberFilter(e.target.value);
    };
  
    const handleEntryDateChange = (e) => {
      setEntryDateFilter(e.target.value);
    };
  
    const handleSpeciesChange = (e) => {
      setSpeciesFilter(e.target.value);
    };
  
    const filteredData = tableData.filter((row) =>
      row.cowNumber.toLowerCase().includes(cowNumberFilter.toLowerCase()) &&
      row.entryDate.includes(entryDateFilter) &&
      row.species.toLowerCase().includes(speciesFilter.toLowerCase())
    );
    //html code
    return (
      <div className='content'>
        <h1>Change cows data</h1>
        <form>
          <label>
            Cow Number:
            <input type="text" value={cowNumberFilter} onChange={handleCowNumberChange} />
          </label>
          <label>
            Entry Date:
            <input type="date" value={entryDateFilter} onChange={handleEntryDateChange} />
          </label>
          <label>
            Species:
            <input type="text" value={speciesFilter} onChange={handleSpeciesChange} />
          </label>
        </form>
        <Table data={filteredData} onDelete={handleDelete} onUpdate={handleUpdate} originaldata={tableData} />
      </div>
    );}

export default Cows_data_change;