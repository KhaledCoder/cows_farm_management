import React from "react";
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import './chartDesign.css'
// chart for new cows
const Newcows_chart = ({chartdata,chartDates}) => {
    
  const data = {
    labels: chartDates, //chart dates here
    datasets: [
      {
        label: 'New cows number',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: chartdata,  //chart data here
      },
    ],
  };

 //chart information
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
//html code
  return (
    <div className="chart_div">
      <h3>New cows rate</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Newcows_chart;