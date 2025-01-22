const express = require('express');
const path = require('path');
const fs = require('fs'); 
const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-survey', (req, res) => {
  
  const surveyData = req.body;

  
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    
    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(surveyData);

    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to data.json:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      
      res.send('Survey submitted successfully!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
