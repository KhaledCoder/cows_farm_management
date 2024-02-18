const http = require('http');
const fs = require('fs');

//function to save data in server 
function saveToJsonFile(data, filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, fileData) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
        return;
      }

      let existingData;
      try {
        existingData = JSON.parse(fileData);
      } catch (parseError) {
        console.error('Error parsing existing JSON data:', parseError);
        reject(parseError);
        return;
      }

    
      const index = existingData.findIndex(item => item.cowNumber === data.cowNumber);

      
      if (index !== -1) {
        console.log(`Element with cowNumber ${data.cowNumber} already exists. Not overwriting.`);
        resolve(false);
        return;
      }

    
      existingData.push(data);

      const jsonData = JSON.stringify(existingData, null, 2);

      fs.writeFile(filename, jsonData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
          reject(writeErr);
        } else {
          console.log('Data saved to', filename);
          resolve(true);
        }
      });
    });
  });
}
//to get server data
const getAllData = () => {
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database.json:', error.message);
    return [];
  }
};
//to update medicale examination
function updateMedicalexamination(cowNumber, newMedicalexamination, filename) {
  fs.readFile(filename, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let existingData;
    try {
      existingData = JSON.parse(fileData);
    } catch (parseError) {
      console.error('Error parsing existing JSON data:', parseError);
      return;
    }

    // Find the index of the object with the matching cowNumber
    const index = existingData.findIndex(item => item.cowNumber === cowNumber);

    // If found, update the Medicalexamination; otherwise, log an error
    if (index !== -1) {
      existingData[index].Medicalexamination = newMedicalexamination;
      const jsonData = JSON.stringify(existingData, null, 2);
      
      fs.writeFile(filename, jsonData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
        } else {
          console.log('Medicalexamination updated for cowNumber', cowNumber);
        }
      });
    } else {
      console.error('Cow with cowNumber', cowNumber, 'not found in the file.');
    }
  });
}
//find smallest available cow number in database
function findSmallestMissingNumberInJSON(jsonArray) {

  const cowNumbers = jsonArray.map(obj => parseInt(obj.cowNumber));

 
  cowNumbers.sort((a, b) => a - b);

  
  let smallestMissing = 1;
  for (let i = 0; i < cowNumbers.length; i++) {
      if (cowNumbers[i] > smallestMissing) {
          return smallestMissing;
      } else if (cowNumbers[i] === smallestMissing) {
          smallestMissing++;
      }
  }

 return smallestMissing;
}
//add new cow born 
function addNewBornCow(motherCowNumber, entryDate) {
  var data = getAllData();
  var smallestCowNumber = findSmallestMissingNumberInJSON(data)
  let motherCowExists = false;

 
  data.forEach(cow => {
    if (cow.cowNumber === motherCowNumber) {
      motherCowExists = true;

      // Add newborn cow
      let newborncow = {
        cowNumber: smallestCowNumber.toString(),
        entryDate: entryDate,
        species: cow.species,
        Medicalexamination: [],
        motherCowNumber: cow.cowNumber,
        Milkproduction: []
      };
      saveToJsonFile(newborncow, 'data.json');
    }
  });

  // If mother cow doesn't exist, return a message
  if (!motherCowExists) {
    return false;
  }
}
/////////////update milk production
function updateMilkproduction(cowNumber, newMilkproduction, filename) {
  fs.readFile(filename, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let existingData;
    try {
      existingData = JSON.parse(fileData);
    } catch (parseError) {
      console.error('Error parsing existing JSON data:', parseError);
      return;
    }

    // Find the index of the object with the matching cowNumber
    const index = existingData.findIndex(item => item.cowNumber === cowNumber);

    // If found, update the Medicalexamination
    if (index !== -1) {
      existingData[index].Milkproduction = newMilkproduction;
      const jsonData = JSON.stringify(existingData, null, 2);
      
      fs.writeFile(filename, jsonData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to file:', writeErr);
        } else {
          console.log('Medicalexamination updated for cowNumber', cowNumber);
        }
      });
    } else {
      console.error('Cow with cowNumber', cowNumber, 'not found in the file.');
    }
  });
}
////////update cow data (cow number,spices,entry date)
function saveCowChangeData(filename, message) {
  
  fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return;
      }

      let jsonData = JSON.parse(data);

      for (let item of jsonData) {
         if (item['cowNumber'] === message['oldcowNumber']) {
              item['cowNumber'] = message['cowNumber'];
              item['entryDate'] = message['entryDate'];
              item['species'] = message['species'];
             
          }
      }

      fs.writeFile(filename, JSON.stringify(jsonData, null, 4), (err) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('File updated successfully');
      });
  });
}
///////delete cow
function deleteByCowNumber(filename, cowNumberToDelete) {
  fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return;
      }

      let jsonData = JSON.parse(data);

      // Filter out the element with the specified cowNumber
      jsonData = jsonData.filter(item => item['cowNumber'] !== cowNumberToDelete);

      fs.writeFile(filename, JSON.stringify(jsonData, null, 4), (err) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log(`Element with cowNumber ${cowNumberToDelete} deleted successfully`);
      });
  });
}




/////////
console.log(getAllData())
const server = http.createServer((req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //<=== enter react port here
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.method === 'POST' && req.url === '/save') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
     
      const { message } = JSON.parse(data);
      message["Medicalexamination"] = [];
      message["motherCowNumber"] = "Null";
      message["Milkproduction"] = [] ;
    
      console.log("Received message from client:", JSON.stringify(message, null, 2));
      
     
      saveToJsonFile(message, 'data.json')
      .then(saved => {
        if (saved) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('it is saved');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('alredy exist cow with this number');
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
      
    });
  }else if (req.method === 'GET' && req.url === '/getAllData') {
   
    const allData = getAllData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allData));
   
  }else if (req.method === 'POST' && req.url === '/savenewcowbirth') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
     
      const { message } = JSON.parse(data);
      
      var save = addNewBornCow(message.cowNumber,message.entryDate)
      console.log(save)
      console.log("new birth message:", JSON.stringify(message, null, 2));
    
      if(save ==false){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('the no cow with this Mother Cow Number');
      }else{
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('it is saved');
      }
    });
  }else if (req.method === 'POST' && req.url === '/saveMedicalExamination') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
     
      const { message } = JSON.parse(data);
      updateMedicalexamination(message.cowNumber, message.Medicalexamination.reverse(), 'data.json');
      console.log("MedicalExamination message :", JSON.stringify(message, null, 2));
    
   
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('it is saved');
    });
  }else if (req.method === 'POST' && req.url === '/saveMilkproduction') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
     
      const { message } = JSON.parse(data);
     updateMilkproduction(message.cowNumber, message.Milkproduction.reverse(), 'data.json')
      console.log("MedicalExamination message :", JSON.stringify(message, null, 2));
    
   
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('it is saved');
    });
  }else if (req.method === 'POST' && req.url === '/savecowchangedata') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {  
      const { message } = JSON.parse(data);
      var save = saveCowChangeData("data.json", message)
      console.log(save)
      console.log("new cow data message :", JSON.stringify(message, null, 2));

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('it is saved');
    });
  }else if (req.method === 'POST' && req.url === '/deletcow') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {  
      const { message } = JSON.parse(data);
      deleteByCowNumber('data.json', message.cowNumber)
      console.log("delete cow data message :", JSON.stringify(message, null, 2));

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('it is saved');
    });
  }else if (req.method === 'POST' && req.url === '/susggestCowNumber') {
    var data = getAllData();
    var susggestCowNumber = findSmallestMissingNumberInJSON(data)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(susggestCowNumber.toString());
   
  }else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});