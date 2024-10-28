const cheerio = require('cheerio');

function scrapeProperties(html, properties) {
    const $ = cheerio.load(html);
    $('.p24_tileContainer, .p24_promotedTile, .p24_development', html).each(function(index) {     

        // const image = $(this).find('.p24_promotedImage').attr('src');
        const relativeLink = $(this).find('a').attr('href');
        const link = `https://www.property24.com${relativeLink}`;
        const rooms = $(this).find('div.p24_description').text().trim() || $(this).find('span.p24_title').text() || $(this).find('div.p24_title').text().trim();
        const size = $(this).find('.p24_size').text().trim() || $(this).find('.p24_size').text().trim();
        const price = $(this).find('.p24_price').text().trim();
        const location = $(this).find('.p24_location').text();
        const dateScraped = new Date().toISOString();
        const isDuplicate = properties.some(item => item.link === link);
        if (!isDuplicate) {
        properties.push({ // javascript method push to push items into the array
            // image,
            link,
            rooms,
            size,
            price,
            location,
            dateScraped
        });
    }
}
    )}
module.exports = scrapeProperties;
