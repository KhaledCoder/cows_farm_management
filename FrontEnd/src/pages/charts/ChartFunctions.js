//find total milk production every day in last week
export function lastWeekMilkproduction(data){
    var yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate .getDate() - 1);
    let lastWeekDates = [];
    for (let i = 0; i < 7; i++) {
      let pastDate = new Date(yesterdayDate);
      pastDate.setDate(yesterdayDate.getDate() - i);
      lastWeekDates.push([pastDate.toISOString().slice(0, 10),0]);
  }
  lastWeekDates.reverse();
  data.forEach(element => {
    element.Milkproduction.forEach(d =>{
      switch(d[0]) {
        case lastWeekDates[0][0]:
          lastWeekDates[0][1] = parseInt(d[1]) + parseInt(lastWeekDates[0][1])
          break;
        case lastWeekDates[1][0]:
          lastWeekDates[1][1] = parseInt(d[1]) + parseInt(lastWeekDates[1][1])
          break;
        case lastWeekDates[2][0]:
          lastWeekDates[2][1] = parseInt(d[1]) + parseInt(lastWeekDates[2][1])
          break;
        case lastWeekDates[3][0]:
          lastWeekDates[3][1] = parseInt(d[1]) + parseInt(lastWeekDates[3][1])
        break;
        case lastWeekDates[4][0]:
          lastWeekDates[4][1] = parseInt(d[1]) + parseInt(lastWeekDates[4][1])
          break;
        case lastWeekDates[5][0]:
          lastWeekDates[5][1] = parseInt(d[1]) + parseInt(lastWeekDates[5][1])
          break;
        case lastWeekDates[6][0]:
          lastWeekDates[6][1] = parseInt(d[1]) + parseInt(lastWeekDates[6][1])
          break;
        default:
          // code block
      }
    })
  });
  var chartData = []
  var chartDates = []
  lastWeekDates.forEach(e =>{
    chartData.push(e[1])
    chartDates.push(e[0])
  }
  )
  return [chartData,chartDates]
  }



/////////////have same moths and year////////
export function haveSameMonthAndYear(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Extracting month and year from the Date objects
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  // Comparing months and years
  return month1 === month2 && year1 === year2;
}

///////////////////////
//find cows that have entry date in last 6 months
export function lastMonthsNewcows(data){
  var currentDate = new Date();
  let lastMonths = [];
  for (let i = 0; i < 7; i++) {
    let pastDate = new Date(currentDate);
    pastDate.setMonth(currentDate.getMonth() - i);
    lastMonths.push([pastDate.toISOString().slice(0, 10),0]);
}
lastMonths.reverse();

data.forEach(date =>{
  for(var i = 0;i<7;i++){
if(haveSameMonthAndYear(date.entryDate, lastMonths[i][0])){
  lastMonths[i][1]= 1 + lastMonths[i][1]
}
}
})

var chartData = []
  var chartDates = []
  lastMonths.forEach(e =>{
    e[0] = e[0].slice(0, -3);
    chartData.push(e[1])
    chartDates.push(e[0])
  }
  )
  return [chartData,chartDates]
}