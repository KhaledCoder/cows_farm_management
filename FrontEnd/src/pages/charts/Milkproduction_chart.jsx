import React from "react";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import './chartDesign.css'
// linear chart for milk production
  const SavingsChart = ({chartdata,chartDates}) => {
     const data = {
      labels:chartDates, //chart dates here
      datasets: [
        {
          label: 'Milk production',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: chartdata  // chart data here
        }
      ]
    }
  //chart information
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
    };

    //html code
    return (
      <div className="chart_div">
        <h3>Milk production this week</h3>
      <Line
      data={data}
      options={config}
    />
    </div>
      );
};

export default SavingsChart;