const express = require('express');
const router = express.Router();

const Listing = require('../models/listing');

// We have determined that we need a route for GET requests to /listings. Let’s build it! Inside of controllers/listings.js do the following steps:

// Create a route for GET requests to /listings.
// Using the Listing model, find all listings.
// console.log() the listings.
// res.send() a message that says “Listings index page”.
// console.log() any errors that occur.
// Test your route in the browser by going to localhost:3000/listings manually.
router.get('/', async (req, res) => {
    const listings = await Listing.find({});

    console.log('Listings:', listings);
    res.render('listings/index.ejs', { listings });

});

module.exports = router;