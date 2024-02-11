const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  skills:[{
    type: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});
const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill