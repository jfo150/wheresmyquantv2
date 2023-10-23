const express = require('express');
const router = express.Router();
const stripe = require('stripe')(require('../config/keys').stripeSecretKey);

const YOUR_DOMAIN = 'wheresmyquant.ai';

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Premium Plan',
          },
          unit_amount: 990,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.send({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: 'Stripe checkout session creation failed' });
  }
});

router.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.send({
      status: session.status,
      customer_email: session.customer_details && session.customer_details.email
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve session' });
  }
});

module.exports = router;
