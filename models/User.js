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
    lowercase: true,
  },
  socials:{
    twitter: {
      type: String,
      lowercase: true,
      default: null,
      required: false,
      unique: true,
    },
    linkedIn: {
      type: String,
      lowercase: true,
      default: null,
      required: false,
      unique: true,
    },
    github: {
      type: String,
      lowercase: true,
      default: null,
      required: false,
      unique: true,
    }
  },
  phone: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    lowercase: true,
  },
  location: {
    type: String,
    lowercase: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;