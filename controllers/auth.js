require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'test jwt secret';
const passport = require('passport');

const {User} = require('../models');

router.post('/signup', async (req, res) => {
    console.log('Inside of /signup');
    const {email, name, password} = req.body;

    try {
       const user = await User.findOne({
           where: {
               email
           }
       });

       if (user) {
           return res.status(400).json({message: 'Email already exists'})
       } else {
            const userData = {email, name};
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) console.log('==> Error inside of hash', err);
                    userData.password = hash;
                })
            });
            const newUser = await User.create(userData);
            return res.json(newUser);
    } catch (error) {
        console.log('Error finding user', error);
        res.json({message: 'Either email or password is incorrect. Please try again.'});
    }
})

router.post('/login', async (req, res) => {
    console.log('Inside of /login');
    console.log(req.body);

    try {
        const foundUser = await User.findOne({
            where: {email: req.body.email}
        });

        if (foundUser) {
            let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
            console.log('Match User', isMatch);

            if (isMatch) {
                const payload = {
                    id: foundUser.id,
                    email: foundUser.email,
                    
                }
            }
        }
    } catch (error) {
        return res.status(400).json({message: 'User not found'});
    }
})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('===> Inside /profile');
    console.log('===> User', req.user);
    const {id, name, email} = req.user;
    res.json({id, name, email});
})

module.exports = router;