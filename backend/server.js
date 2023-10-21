const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const sessionMiddleware = require('./middleware/session');
const passportConfig = require('./config/passport-config');
require('dotenv').config();
const path = require('path');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Passport middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session()); 
passportConfig(passport);

// CORS (if frontend and backend are on different domains/ports)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/payments', require('./routes/payments'));

// serve frontend
app.use(express.static(path.join(__dirname, '../frontend/build'))); 

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html')); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
