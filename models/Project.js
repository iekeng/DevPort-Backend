const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    repoURL: {
        required: true,
        type: String,
    },
    liveURL: {
        required: true,
        type: String,
    },
    description:{
        required: true,
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;