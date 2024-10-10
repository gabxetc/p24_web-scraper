// The PORT our server runs on
const PORT = 8000

// Getting the package and storing it in these variable names

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

// Initialising express by calling it and all it's packages and storing it in app
const app = express()

const url = 'https://www.property24.com/to-rent/montgomery-park/johannesburg/gauteng/5780' // Montgomery Park
// const url = 'https://www.property24.com/to-rent/northcliff/randburg/gauteng/5783' // Northcliff

// const inquirer = require('inquirer');

// const questions = [
//   {
//     type: 'input',
//     name: 'url',
//     message: "Please enter a Property24 Url",
//   },
// ];

// inquirer.prompt(questions).then(url => {
// });

axios(url) // Chaining. Returns a promise THEN we get the reponse of whatevers come back.
    .then(response => {
        const html = response.data // We get the response data and save it as HTML
        const $ = cheerio.load(html)
        const properties = []
        
        //<div class="p24_regularTile js_rollover_container js_resultTileClickable   p24_tileHoverWrapper" itemscope itemtype="http://schema.org/Product" data-listing-number="114932369">
        // <span class="p24_price" itemprop="price" content="17000">…</span>
        $('.p24_content', html).each(function() {
        const link = $(this).attr('href')
        const rooms = $(this).find('span.p24_title').text()
        const size = $(this).find('.p24_size').text().trim()
        const price = $(this).find('.p24_price').text().trim()
        const location = $(this).find('.p24_location').text()
        const date_scraped = new Date().toISOString()

        properties.push({ // javascript method push to push items into the array
            link,
            rooms,
            size,
            price,
            location,
            date_scraped
        })
    }) 
    console.log(properties)

    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))

