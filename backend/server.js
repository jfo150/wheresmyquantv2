const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const sessionMiddleware = require('./middleware/session');
const passportConfig = require('./config/passport-config');
require('dotenv').config();
const path = require('path');
const app = express();
const User = require('./models/User');




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

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
});
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer.email;

    // Find the user by their email
    User.findOneAndUpdate({ email: customerEmail }, { premium: true, stripeCustomerId: session.customer.id }, { new: true }, (err, updatedUser) => {
        if (err) {
            console.error("Error updating user after payment:", err);
            return;
        }
        if(!updatedUser) {
            console.error("No user found with email:", customerEmail);
            return;
        }
        console.log("User upgraded to premium:", updatedUser);
    });
}



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
