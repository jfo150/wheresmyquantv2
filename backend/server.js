const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const sessionMiddleware = require('./middleware/session');
const passportConfig = require('./config/passport-config');
require('dotenv').config();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 


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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});

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
