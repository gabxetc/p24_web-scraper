// The PORT our server runs on
const PORT = 8000

// Getting the package and storing it in these variable names

const axios = require('axios');  // library that allws you to make HTTP requests
const cheerio = require('cheerio'); // allows to extract info from html documents
const express = require('express'); // Handles the server
const fs = require('fs'); // built in file system that handles reading, writing and updating files
const cors = require('cors'); // cross origin resource sharing


let writeCounter = 0; // Counter to track number of writes
const maxWrites = 1; // Write limit
const shutdownDelay = 1000; // delay time
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
        const html = response.data // We get the response data and save it as HTML
        const $ = cheerio.load(html)
        const properties = []
        
        $('.p24_tileContainer', html).each(function() {
            const isSponsored = $(this).find('.p24_sponsored').text().trim();
            
        if (isSponsored){
            // console.log('Has sponsored class:', isSponsored);
            // const previousAnchor = $(this).closest('div').attr('href');  
            const relativeLink = $(this).find('a').attr('href');
            const link = `https://www.property24.com${relativeLink}`;
            const rooms = $(this).find('div.p24_description').text().trim();
            const size = $(this).find('.p24_size').text().trim();
            const price = $(this).find('.p24_price').text().trim();
            const location = $(this).find('.p24_location').text();
            const dateScraped = new Date().toISOString();
            properties.push({ // javascript method push to push items into the array
                link,
                rooms,
                size,
                price,
                location,
                dateScraped
            });
        }
            else if (!isSponsored) {
            // console.log('No sponsored class');
        const relativeLink = $(this).find('a').attr('href');
        const link = `https://www.property24.com${relativeLink}`;
        const rooms = $(this).find('span.p24_title').text();
        const size = $(this).find('.p24_size').text().trim();
        const price = $(this).find('.p24_price').text().trim();
        const location = $(this).find('.p24_location').text();
        const dateScraped = new Date().toISOString();

        properties.push({ // javascript method push to push items into the array
            link,
            rooms,
            size,
            price,
            location,
            dateScraped
        });
    }
});

    console.log(properties)

    // Writing of a Js objection into JSON format into the file
    fs.writeFile('html/properties.json', JSON.stringify(properties, null, 2), (err) => {
        if (err) {
            console.log('Error writing to file:', err);
            return res.status(500).send('Error writing to file');
        } else {
            console.log('JSON data saved to properties.json');
            writeCounter++;
    
            // Shut down the server after a specified delay if the write counter reaches maxWrites
            if (writeCounter >= maxWrites) {

                // app.post('/clear-json', (req, res) => {
                //     fs.writeFile('html/properties.json', JSON.stringify({}), (err) => {
                //         if (err) {
                //             return res.status(500).send('Error clearing JSON file');
                //         }
                //         res.send('JSON file cleared');
                //     });
                // });

                console.log('Max writes reached. Shutting down server after delay...');
                setTimeout(() => {
                    server.close(() => {
                        console.log('Server closed.');
                        process.exit(0); 
                    });
                }, shutdownDelay); 
            }
            return res.json(properties); 
        }
    });
})
.catch(err => {
    console.error('Error fetching the page:', err);
    res.status(500).send('Error scraping the page');
});
});


server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const montgomery park = https://www.property24.com/to-rent/montgomery-park/johannesburg/gauteng/5780
// const rivonia = https://www.property24.com/to-rent/rivonia/sandton/gauteng/4251