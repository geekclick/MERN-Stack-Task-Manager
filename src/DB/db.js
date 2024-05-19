const mongoose = require('mongoose');
require("dotenv").config();

const URL = process.env.MONGO_URI;


const connectionDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB is Connected")
    } catch (error) {
        console.error("This connection could not be make");
        process.exit(0);
    }
}

module.exports = connectionDB;