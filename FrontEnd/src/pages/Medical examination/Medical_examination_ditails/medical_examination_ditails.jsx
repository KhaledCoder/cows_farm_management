import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './medical_examination_ditails.css';
import { useLocation } from 'react-router-dom';

//Medical_Examination__Ditails page
function Medical_Examination__Ditails () {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const jsonData = JSON.parse(queryParams.get('data'));
    const [response, setResponse] = useState('');
    console.log(jsonData)
    ///////////
    const initialData = jsonData.Medicalexamination;
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    healthStatus: '',
    examinationDate: '',
    description: ''
  });

  const handleEdit = (index) => {
    console.log("index",index)
    setEditIndex(index);
  };

  //add new row
  const handleSave = (index,item) => {
    console.log("item:",item)
    if(item[0]==""){
      setResponse("you must enter Health status")
    }else if(item[1]==""){
      setResponse("you must enter Examination date")
    }else if(item[2]==""){
      setResponse("you must enter Description")
    }else{
    setEditIndex(null);
    
    }
  };
//delete row
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

  //save row change data
  const handleSubmit = (e) => {
//make sure that all from inputs are not empty
    if(formData.healthStatus==""){
      setResponse("you must enter health Status")
      e.preventDefault();
    setData(data);
    

    }else if(formData.examinationDate==""){
      setResponse("you must enter Examination Date")
      e.preventDefault();
    setData(data);
   
    }else if(formData.description==""){
      setResponse("you must enter Description")
      e.preventDefault();
    setData(data);
    
    }else{
      setResponse("")
    e.preventDefault();
    setData([...data, [formData.healthStatus, formData.examinationDate, formData.description]]);
    setFormData({
      healthStatus: '',
      examinationDate: '',
      description: ''
    });
  }};
// send data table to server and save it
  const handleSaveAll = async () => {
    let send_date = {
        cowNumber : jsonData.cowNumber,
        Medicalexamination: data
    }
    console.log(send_date);
    try {
        const response = await fetch('http://localhost:3001/saveMedicalExamination', {
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
          
        
        
        <h2>Examination Details of cow number {jsonData.cowNumber}</h2>
        <p>add new examination:</p>
        
        
        <form >
        <label>
          Health Status:
          <input type="text" name="healthStatus" value={formData.healthStatus} onChange={handleFormChange} />
        </label>
        <label>
          Examination Date:
          <input type="date" name="examinationDate" value={formData.examinationDate} onChange={handleFormChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleFormChange} />
        </label>
        <button onClick={handleSubmit}>Add</button>
      </form>
      
      <p>{response}</p>
        <table className="cow-table">
        <thead>
          <tr>
            <th>Health status</th>
            <th>Examination date</th>
            <th>Description</th>
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
                    type="text"
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
                    type="date"
                    value={item[1]}
                    onChange={(e) => handleChange(e, index, 1)}
                  />
                ) : (
                  item[1]
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={item[2]}
                    onChange={(e) => handleChange(e, index, 2)}
                  />
                ) : (
                  item[2]
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSave(index , item)}>Save</button>
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
export default Medical_Examination__Ditails;