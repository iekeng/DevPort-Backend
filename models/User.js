const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  summary: {
    type: String,
  },
  socials:{
    twitter: {
      type: String,
      default: null,
      required: false,
    },
    linkedIn: {
      type: String,
      default: null,
      required: false,
    },
    github: {
      type: String,
      default: null,
      required: false,
      unique: true,
    }
  },
  phone: {
    type: String,
    required: false,
  },
  avatar_url: {
    type: String,
    lowercase: true,
  },
  location: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;