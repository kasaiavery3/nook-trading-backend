const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
require('./config/passport')(passport);

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/auth', require('./controllers/auth'));
app.use('/items', require('./controllers/item'));

app.listen(PORT, () => console.log(`Listening on PORT`, PORT));