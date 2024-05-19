const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});
const Notification = new mongoose.model("Notification", notificationSchema);

module.exports = User;