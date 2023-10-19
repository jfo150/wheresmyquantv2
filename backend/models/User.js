const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  promptCount: {
    type: Number,
    default: 0
  },
  subscriptionType: {
    type: String,
    default: 'free'
  }
});

module.exports = User = mongoose.model('users', UserSchema);
