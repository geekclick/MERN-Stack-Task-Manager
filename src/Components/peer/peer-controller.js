const express = require('express');
const User = require('../../Models/user-model');



const peerRequest = async (req, res) => {
    try {

        const { senderId, recieverId } = req.body;

        const reciever = await User.findById(recieverId)

        if (!reciever) {
            return res.status(404).json({ msg: "user doesn't exist for peer request" });
        }

        // Update the related task list in the project
        reciever.notifications.push(senderId);
        await reciever.save();


        res.status(201).json({
            msg: "Request sent succesfull",
        });

    } catch (error) {

        console.log(error, "Internal Server Error");
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const addPeer = async (req, res) => {
    try {

        const { senderId, recieverId } = req.body;

        const reciever = await User.findById(recieverId)
        const sender = await User.findById(senderId)

        if (!reciever || !sender) {
            return res.status(404).json({ msg: "user doesn't exist for peer request" });
        }

        // Update the related task list in the project
        reciever.peers.push(sender);
        await reciever.save();

        sender.peers.push(reciever);
        await sender.save();


        res.status(201).json({
            msg: "Peer added successfully",
        });

    } catch (error) {

        console.log(error, "Internal Server Error");
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { peerRequest, addPeer };