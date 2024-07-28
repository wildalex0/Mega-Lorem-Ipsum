const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Memory Saved Data - Saved as JSON for easier accesibility.
let data = require('./dataFiles/data.json');
let history = require('./dataFiles/history.json');

//API Routes
app.get('/api/records', (req,res) => {
    //Fetching and returning all the data stored.
    res.json(data);
});
app.get('/api/history', (req,res) => {
    res.json(history.slice(0,5));
});
app.post('/api/records', (req, res) => {
    //Adds a new record
    const newRecord = req.body;
    data.push(newRecord);
    res.status(201).json(newRecord);
    console.log(newRecord);
});
app.post('/api/history', (req,res) => {
    const entry = req.body;
    //Latest change should be recorded as the first entry
    history = [entry, ...history];
    res.status(201).json(entry);
})
app.put('/api/records/:id', (req,res) => {
    //Updates a new record using the id as a param
    const id = parseInt(req.params.id);
    console.log(`ID: ${id} - ${typeof(id)}`);
    const updatedRecord = req.body;
    data = data.map(record => (record.id === id ? updatedRecord : record));
    res.json(updatedRecord);
});

app.delete('/api/records/:id', (req,res) => {
    //Deletes an already existing record using the id as a param
    const id = parseInt(req.params.id);
    console.log(`${id} - ${typeof(id)}`);
    data = data.filter(record => record.id !== id);
    res.status(204).end();
})
//Hosts the server on the backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port 5000'));
