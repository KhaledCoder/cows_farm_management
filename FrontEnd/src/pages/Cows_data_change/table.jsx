import React, { useState } from 'react';
import './cows_data_change.css';
// change cow data table
function Table({ data, onDelete, onUpdate ,originaldata}) {
  //function to chek if cow number already exist(can't change cow number to number that already exist)
  function checkIfCowNumberAlreadyExist(cowNumber,row){
    var AlreadyExist = false
    if(cowNumber == row.cowNumber){

    }else{
      originaldata.forEach(element => {
        if(element.cowNumber == cowNumber){
          AlreadyExist = true
        }
      });
    }
    
    return AlreadyExist
  }
  //function to handle change of cow number (to avoid confusing between old and new cow number)
  function putInOriginaldata(oldcowNumber,newcowNumber){
    
    originaldata.forEach(element => {
      if(element.cowNumber == oldcowNumber){
        element.cowNumber = newcowNumber
      }
    });
  }


  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [originalCowNumber, setOriginalCowNumber] = useState(null);
  const [response, setResponse] = useState('');

  //function to send to server cow data to delete
  const sendDeleteToServer = async (index, row) => {
   
    onDelete(index);
    
    /////////send delete to server/////////
    try {
      const formData = {
        cowNumber: row.cowNumber,
      }
      const response = await fetch('http://localhost:3001/deletcow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: formData }),
      });
      const response_text = await response.text();
      
    } catch (error) {
      console.error('Error:', error);
    }
    ///////////////////////////////////////
  };

  // ask if user are sure of delete data(by popup windows)
  const confirmDelete = (index , row) => {
    if (window.confirm('Are you sure you want to delete this data?')) {
      sendDeleteToServer(index , row);
    }
  };

  const handleEdit = (rowIndex, rowData) => {
    setEditingRow(rowIndex);
    setEditedData({ ...rowData });
    setOriginalCowNumber(rowData.cowNumber); // Set original cowNumber when editing starts
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // the save of update data
  const handleUpdate = async (row) => {
    //check that new cow number in not exist alredy in database
    // and check that form inputs are not empty 
    if(checkIfCowNumberAlreadyExist(editedData.cowNumber,row)){
      setResponse("there already exist cow have this number")
    }else if(editedData.cowNumber == ""){
      setResponse("you must enter Cow number")
    }else if(editedData.entryDate == ""){
      setResponse("you must enter Entry Date")
    }else if(editedData.species == ""){
      setResponse("you must enter Species")
    }else{
      setResponse("")
      putInOriginaldata(originalCowNumber,editedData.cowNumber)
     
    onUpdate(editingRow, editedData);
    var oldcowNumber = originalCowNumber;
    var cowNumber = editedData.cowNumber;
    var entryDate = editedData.entryDate;
    var species = editedData.species;
    const formData = {
      oldcowNumber,
      cowNumber,
      entryDate,
      species
    };
    setEditingRow(null);
    setEditedData({});
    
    /////////send updated data to server/////////////
    
    try {
      const response = await fetch('http://localhost:3001/savecowchangedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: formData }),
      });
      const response_text = await response.text();
      
    } catch (error) {
      console.error('Error:', error);
    }
   //////////////////////////////////////
  }};

  //html code
  return (
    <div>
      <p>{response}</p>
    <table className='cow-table'>
      <thead>
        <tr>
          <th>Cow Number</th>
          <th>Entry Date</th>
          <th>Species</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  name="cowNumber"
                  value={editedData.cowNumber || ''}
                  onChange={handleChange}
                />
              ) : (
                row.cowNumber
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="date"
                  name="entryDate"
                  value={editedData.entryDate || ''}
                  onChange={handleChange}
                />
              ) : (
                row.entryDate
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  name="species"
                  value={editedData.species || ''}
                  onChange={handleChange}
                />
              ) : (
                row.species
              )}
            </td>
            <td>
              {editingRow === index ? (
                <>
                  <button onClick={() =>handleUpdate(row)}>Save</button>
                  <button onClick={() => setEditingRow(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(index, row)}>Edit</button>
                  <button onClick={() => confirmDelete(index , row)}>Delete</button>
                  
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Table;
