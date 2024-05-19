const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    budget: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    related_tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
