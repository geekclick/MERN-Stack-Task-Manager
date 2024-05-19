const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    task_status: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);