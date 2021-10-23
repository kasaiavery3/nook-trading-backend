require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'test jwt secret';
const passport = require('passport');

const {User} = require('../models');

router.post('/login', async (req, res) => {
  try {
    console.log('===> Inside of /login');
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
          name: foundUser.name
        }

        jwt.sign(payload, JWT_SECRET, {expiresIn: 3600}, (err, token) => {
          if (err) {
            return res.status(400).json({message: 'Session has ended, please log in again'});
          }
          const legit = jwt.verify(token, JWT_SECRET, {expiresIn: 60});
          console.log('==> legit');
          console.log(legit);
          res.json({success: true, token: `Bearer ${token}`, userData: legit})
        })
      } else {
        return res.status(400).json({message: 'Email or Password is incorrect'});
      } 
    } else {
      return res.status(400).json({message: 'User not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "There was an error, please try again"});
  }
})

router.post('/signup', async (req, res) => {
    // we now have access to the user info (req.body);
    console.log(req.body);
    const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object
    try {
      const foundUser = await User.findOne({
        where: {email}
      });

      if (foundUser) {
        console.log(foundUser);
        return res.status(400).json({message: 'Email already exists'});
      } else {
        const userData = {
          name,
          email
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        userData.password = hash;

        const createdUser = User.create(userData);
        return res.json({createdUser});
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'There was an error, please try again'
      })
    }
});
  
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('Inside /profile');
  console.log('===> user', req.user);

  const {id, name, email} = req.user;
  return res.json({id, name, email});
})

module.exports = router;