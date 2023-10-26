const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  premium: {
    type: Boolean,
    default: false
  },
  stripeCustomerId: {
    type: String,
    default: null
}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
