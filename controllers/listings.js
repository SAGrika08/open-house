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
  try {
    const populatedListings = await Listing.find({}).populate('owner');
    res.render('listings/index.ejs', {
      listings: populatedListings,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new',async (req, res) => {
    res.render('listings/new.ejs');
});

router.get('/:listingId', async (req, res) => {
  try {
    const populatedListings = await Listing.findById(
      req.params.listingId
    ).populate('owner');

    res.render('listings/show.ejs', {
      listing: populatedListings,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:listingId', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (listing.owner.equals(req.session.user._id)) {
      await listing.deleteOne();
      res.redirect('/listings');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


router.get('/:listingId/edit', async (req, res) => {
  try {
    const currentListing = await Listing.findById(req.params.listingId);
    res.render('listings/edit.ejs', {
      listing: currentListing,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:listingId', async (req, res) => {
  try {
    const currentListing = await Listing.findById(req.params.listingId);

    if (currentListing.owner.equals(req.session.user._id)) {
      await currentListing.updateOne(req.body);
      res.redirect('/listings');
    } else {
       res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create a route for POST requests to /listings.
// console.log() the data being sent from the form.
// Using res.redirect() redirect to /listings.
// Test by submitting the form in the browser.

// 🚨 Make sure to use req.body to access the data from the form.
router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Listing.create(req.body);
    res.redirect('/listings');
}); 
    
module.exports = router;