const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  organisation: {
    type: String,
  },
  position: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String
  },
  achievements: [{
    type: String
  }],
  responsibilities: [{
    type:String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;