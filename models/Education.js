const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
  },
  degree: {
    type: String,
  },
  course: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  location: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;