const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('./config/passport-config'); 
require('dotenv').config();

const app = express();

// stripe integration

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB



const dbConnectionURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/mydatabase`;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// CORS (if your frontend and backend are on different domains/ports)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
const users = require('./routes/users');
app.use('/api/users', users);
const payments = require('./routes/payments');
app.use('/api/payments', payments);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
