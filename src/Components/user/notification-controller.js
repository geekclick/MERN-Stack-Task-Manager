const express = require('express');
const User = require('./user-model');



const clearNotification = async (req, res) => {
    try {

        const { userId } = req.body;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }

        // Update the related task list in the project
        user.notifications.pop();
        await user.save();


        res.status(201).json({
            msg: "Notification cleared",
        });

    } catch (error) {

        console.log(error, "Internal Server Error");
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { clearNotification };