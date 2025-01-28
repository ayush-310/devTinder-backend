const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { connections } = require('mongoose');
const userRouter = express.Router();
const User = require('../models/user');

const USER_SAFE_DATA = ["firstName", "lastName", "age", "about", "email", "skills", "gender", "photoUrl"];

// get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        /* This code snippet is querying the database to find all pending connection requests for the
        logged-in user. It is using the `ConnectionRequest` model to find documents that match the
        criteria specified in the `find` method: */
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl"]);

        res.json({
            message: "Connection requests",
            data: connectionRequests
        })

    } catch (error) {
        res.status(400).send("ERROR" + error.message);

    }
});


userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Akshay => Elon => accepted (Elon is the toUser)
        // Elon => Mark => accepted (Elon is the fromUser)

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data })

    } catch (error) {
        res.status(400).send("ERROR" + error.message);

    }
});


userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        // User should see all the other user cards except
        // 1) his  own card
        // 2) his connection
        // 3) ignored people
        // 4) already sent the connection request

        // Example: Rahul =>[Akshay , Elon, Mark,Donald , MS Dhoni, virat ]
        // Rahul->Akshay->rejected, Rahul->Elon->Accepted
        // Elon see all users except Rahul

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        // Find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        })
            .select("fromUserId toUserId")
        // .populate("fromUserId", "firstName") // Removed extra space
        // .populate("toUserId", "firstName"); // Removed extra space


        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((row) => {
            hideUsersFromFeed.add(row.fromUserId.toString());
            hideUsersFromFeed.add(row.toUserId.toString());
        })

        // Find all the users except the hideUsersFromFeed user and loggedInUser
        const users = await User.find({
            $and: [
                { _id: { $ne: loggedInUser._id } },
                { _id: { $nin: Array.from(hideUsersFromFeed) } }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        // Send the connection requests as the result
        res.send(users);



    } catch (error) {
        res.status(400).send("ERROR" + error.message);
    }
})


module.exports = userRouter;