const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skills:{soft: [{
    type: String,
  }], technical: [{
    type: String,
  }]},
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill