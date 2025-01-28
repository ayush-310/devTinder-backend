const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

// Request API - POST /request/send/:status/:toUserId - send connection request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json("Invalid status : " + status);
        }

        // User exists or not
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User not found!" });
        }

        // If there is an existing ConnectionRequest 
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId }, // checks Ayush sent request to Akshay
                { fromUserId: toUserId, toUserId: fromUserId } // checks Akshay sent request to Ayush
            ]
        });

        if (existingConnectionRequest) {
            return res
                .status(400)
                .json("Connection Request already exist!");
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        });

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

// Request API - POST /request/review/:status/:requestId - review connection request
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params; // Fixed destructuring of parameters.

        // Validate the provided status.
        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Status not allowed` });
        }

        // Find the connection request with the required conditions.
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id, // Ensure the request is for the logged-in user.
            status: 'interested', // Only review requests that are in 'interested' state.
        });

        if (!connectionRequest) {
            return res.status(404).json({ error: "Connection Request not found or invalid!" });
        }

        // Update the connection request status.
        connectionRequest.status = status;

        const updatedRequest = await connectionRequest.save();

        res.json({
            message: `Connection Request has been ${status}.`,
            data: updatedRequest,
        });

    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});


module.exports = requestRouter;
