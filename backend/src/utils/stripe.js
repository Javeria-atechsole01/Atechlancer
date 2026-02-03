const Stripe = require('stripe');
const { User } = require('../models/User');

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET) {
  console.warn('Stripe secret key not set. Please set STRIPE_SECRET_KEY in environment.');
}
const stripe = new Stripe(STRIPE_SECRET || 'sk_test_dummy', { apiVersion: '2023-10-16' });

async function getOrCreateStripeCustomer(userId, email) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: email || user.email,
    metadata: { appUserId: userId.toString() }
  });

  user.stripeCustomerId = customer.id;
  await user.save();

  return customer.id;
}

module.exports = { stripe, getOrCreateStripeCustomer };

