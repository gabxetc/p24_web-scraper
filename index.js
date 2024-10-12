// The PORT our server runs on
const PORT = 8000

// Getting the package and storing it in these variable names

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const cors = require('cors');


let writeCounter = 0; // Counter to track number of writes
const maxWrites = 2; // Write limit
const shutdownDelay = 500;
let server;

const app = express(); // Initialising express by calling it and all it's packages and storing it in app

app.use(express.json());
app.use(cors()); // Allows all origins

// app.post('/scrape', (req, res) => {
//     const { url } = req.body;

//     if (!url) {
//         return res.status(400).json({ error: 'No URL provided' });
//     }

const url = 'https://www.property24.com/to-rent/northcliff/randburg/gauteng/5783' // Northcliff

axios(url) // Chaining. Returns a promise THEN we get the reponse of whatevers come back.
    .then(response => {
        const html = response.data // We get the response data and save it as HTML
        const $ = cheerio.load(html)
        const properties = []
        
        $('.p24_content', html).each(function() {
        const link = $(this).attr('href')
        const rooms = $(this).find('span.p24_title').text()
        const size = $(this).find('.p24_size').text().trim()
        const price = $(this).find('.p24_price').text().trim()
        const location = $(this).find('.p24_location').text()
        const dateScraped = new Date().toISOString()

        properties.push({ // javascript method push to push items into the array
            link,
            rooms,
            size,
            price,
            location,
            dateScraped
        });
    });

    console.log(properties)

    if (properties.length === 0) {
        console.log('No properties found.');
        // return res.status(404).send('No properties found');
    }

    fs.writeFile('properties.json', JSON.stringify(properties, null, 2), (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            // return res.status(500).send('Error writing to file');
        } else {
            console.log('JSON data saved to properties.json');
            writeCounter++;

            // Shut down the server after a specified delay if the write counter reaches maxWrites
            if (writeCounter >= maxWrites) {
                console.log('Max writes reached. Shutting down server after delay...');
                setTimeout(() => {
                    server.close(() => {
                        console.log('Server closed.');
                        process.exit(0); // Exit the process
                    });
                }, shutdownDelay); // Delay before shutting down the server
            }
            // return res.json(properties); // Send response back to client
        }
    });
})
.catch(err => {
    console.error('Error fetching the page:', err);
    res.status(500).send('Error scraping the page');
});
// });

server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});