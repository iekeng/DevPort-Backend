const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  soft_skills: [{
    type: String,
  }], 
  technical_skills: [{
    type: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill