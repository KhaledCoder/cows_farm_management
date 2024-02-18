import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
//Milk_Production_Update page
function Milk_Production_Update () {
  // make sure that milk quantity is natural number
  function isNaturalNumber(str) {
   
    var naturalNumber = /^(0*[1-9]\d*|0)$/;
    return naturalNumber.test(str);
  }
  const [response, setResponse] = useState('');
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const jsonData = JSON.parse(queryParams.get('data'));
    console.log(jsonData)
    const initialData = jsonData.Milkproduction;
    const [data, setData] = useState(initialData);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        Date: '',
        quantity: ''
    });
  
    const handleEdit = (index) => {
      setEditIndex(index);
    };
  
    //save the update of row
    const handleSave = (index,item) => {
      console.log("item:",item)
    if(item[0]==""){
      setResponse("you must enter the date")
    }else if(!(isNaturalNumber(item[1]))){
      setResponse("the quantity must be natural number")
    }else {
    setEditIndex(null);
    // Save changes to your data source here
    }
      
    };
  
    const handleDelete = (index) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    };
  
    const handleChange = (e, index, columnIndex) => {
      const newData = [...data];
      newData[index][columnIndex] = e.target.value;
      setData(newData);
    };
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    //add new milk production to the table
    const handleSubmit = (e) => {
      if(formData.Date==""){
        setResponse("you must enter the date")
        e.preventDefault();
      }else if(!(isNaturalNumber(formData.quantity))){
        setResponse("quantity must be natural number");
        e.preventDefault();
      }else{
      e.preventDefault();
      setData([...data, [formData.Date, formData.quantity]]);
      setFormData({
        Date: '',
        quantity: ''
      });
    }};
  // send table data to the server
    const handleSaveAll = async () => {
      let send_date = {
          cowNumber : jsonData.cowNumber,
          Milkproduction: data
      }
      console.log(send_date);
      try {
          const response = await fetch('http://localhost:3001/saveMilkproduction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: send_date }),
          });
    
          const server_response = await response.text();
          console.log(server_response)
          setResponse(server_response)
        } catch (error) {
          console.error('Error:', error);
        }
    };
  
      ////////////////html code
      return (
          <div className='content'>
            
          
          
          <h2>Milk production details of cow number {jsonData.cowNumber}</h2>
          <p>add new milk production record:</p>
          
          
          
          <form onSubmit={handleSubmit}>
          
          <label>
             Date:
            <input type="date" name="Date" value={formData.Date} onChange={handleFormChange} />
          </label>
          <label>
            quantity:
            <input type="text" name="quantity" value={formData.quantity} onChange={handleFormChange} />
          </label>
          <button type="submit">Add</button>
        </form>
        <p>{response}</p>
          <table className="cow-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Daily milk quantity</th>
              <th>Change</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="date"
                      value={item[0]}
                      onChange={(e) => handleChange(e, index, 0)}
                    />
                  ) : (
                    item[0]
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={item[1]}
                      onChange={(e) => handleChange(e, index, 1)}
                    />
                  ) : (
                    item[1]
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={() => handleSave(index,item)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Change</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          <button onClick={handleSaveAll}>Save</button>
        </div>
      );
    }
export default Milk_Production_Update