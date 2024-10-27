const cheerio = require('cheerio');

function scrapeProperties(html, properties) {
    const $ = cheerio.load(html);

    $('.p24_tileContainer', html).each(function(index) {      
        // console.log(`Processing tile #${index}`);      
        const isSponsored = $(this).find('.p24_sponsored').length > 0;
        const isPromoted = $(this).find('.p24_promotedImage').length > 0;
        
    if (isPromoted) {
        const relativeLink = $(this).find('a').attr('href');
        const link = `https://www.property24.com${relativeLink}`;
        const rooms = $(this).find('div.p24_description').text().trim();
        const size = $(this).find('.p24_size').text().trim();
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
    else if (isSponsored){
        // console.log('Has sponsored class:', isSponsored);
        // const previousAnchor = $(this).closest('div').attr('href');  
        // const image = $(this).find('.p24_promotedImage').attr('src');
        const relativeLink = $(this).find('a').attr('href');
        const link = `https://www.property24.com${relativeLink}`;
        const rooms = $(this).find('div.p24_description').text().trim();
        const size = $(this).find('.p24_size').text().trim();
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
        else {
        // console.log('No sponsored class');
        // const image = $(this).find('.js_P24_listingImage').attr('src');
        // console.log(`Processing tile #${index}`); 
        const relativeLink = $(this).find('a').attr('href');
        const link = `https://www.property24.com${relativeLink}`;
        const rooms = $(this).find('span.p24_title').text();
        const size = $(this).find('.p24_size').text().trim();
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
});
}

module.exports = scrapeProperties;
