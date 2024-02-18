import React, { useState ,useEffect} from 'react';
import  SavingsChart  from '../charts/Milkproduction_chart.jsx';
import Newcows_chart from '../charts/Newcows_chart.jsx';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { lastWeekMilkproduction,lastMonthsNewcows } from '../charts/ChartFunctions.js';
import './dashboard.css';

//the dashboard
const Dashboard = () => {
  const [totalCowsNumber, settotalCowsNumber] = useState(0);
    const [data, setData] = useState([]);
    /////////get data from the server //////
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getAllData');
        const result = await response.json();
        setData(result);
        settotalCowsNumber(result.length) //set total cow number
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
  //make linear chart and give data to it
    var Milkproduction_ChartData = lastWeekMilkproduction(data)
  //make bars chart and give data to it
    var Newcows_chartData = lastMonthsNewcows(data)
    

  //html code
  return (
    <div className='content'>
      <div className='horizontal-div'>
      <div className="card">
        <h2>Total Cow Number</h2>
        <p>{totalCowsNumber}</p>
      </div>
      </div>
    <div className='horizontal-div'>
    <Newcows_chart  chartdata ={Newcows_chartData[0]} chartDates={Newcows_chartData[1]}/>
    <SavingsChart chartdata ={Milkproduction_ChartData[0]} chartDates={Milkproduction_ChartData[1]}/>
        

    </div>
    </div>
  );
};

export default Dashboard;