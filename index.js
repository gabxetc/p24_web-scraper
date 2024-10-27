// The PORT our server runs on
const PORT = 8000

// Getting the package and storing it in these variable names

// import axios from 'axios';  // library that allows you to make HTTP requests
// import { load } from 'cheerio'; // allows to extract info from html documents
// import express, { json } from 'express'; // Handles the server
// import { writeFile } from 'fs'; // built in file system that handles reading, writing and updating files
// import cors from 'cors'; // cross origin resource sharing

const axios = require('axios');  // library that allws you to make HTTP requests
const cheerio = require('cheerio'); // allows to extract info from html documents
const express = require('express'); // Handles the server
const fs = require('fs'); // built in file system that handles reading, writing and updating files
const cors = require('cors'); // cross origin resource sharing
const scrapeProperties = require('./scrape');
const scrapePropertiesPromotedImage = require('./scrape');

let server;

const app = express(); // Initialising express by calling it and all it's packages and storing it in app

app.use(express.json()); // Handles the incomeing req and parses it as JSON data to the be handled as Js object
app.use(cors()); // Allows all origins meaning any website can make requests to my server

app.post('/scrape', (req, res) => { // Extracting the url from the /scrape endpoint
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

console.log(url);


axios(url) // Chaining: Returns a promise THEN we get the reponse of whatevers come back.
    .then(response => {
        // console.log("Response Status:", response.status); // Check the response status
        // console.log("Response Data:", response.data);
        const html = response.data // We get the response data and save it as HTML
        const $ = cheerio.load(html)
        const properties = [];
        
    scrapeProperties(html, properties);

    console.log(properties);

// Writing of a Js objection into JSON format into the file
fs.writeFile('html/properties.json', JSON.stringify(properties, null, 2), (err) => {
    if (err) {
        console.log('Error writing to file:', err);
        return res.status(500).send('Error writing to file');
    } else {
        console.log('JSON data saved to properties.json');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0); 
        });
        return res.json(properties); 
        }
    }
)}
)
});
server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const montgomery park = https://www.property24.com/to-rent/montgomery-park/johannesburg/gauteng/5780
// const rivonia = https://www.property24.com/to-rent/rivonia/sandton/gauteng/4251