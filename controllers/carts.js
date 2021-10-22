const express = require('express');
const router = express.Router();
const passport = require('passport');

// add item to cart
router.put('/:itemId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        // Grab logged-in user's id from the request
        // Grab the item's id from the request parameters

        // Create the association
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "There was an error, please try again"});
    }
})

// remove item from cart

module.exports = router;