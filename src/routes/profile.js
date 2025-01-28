const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileEditData } = require('../utils/validation');

// Profile API - GET /profile/view - view the user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = await req.user;
        res.send(user);
    }
    catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

        // Saved Data in database
        await loggedInUser.save();
        // console.log(loggedInUser);

        // Add logic to update the user profile here

        res.json({
            message: `${loggedInUser.firstName} , your Profile updated successfully`,
            data: loggedInUser,
        });
    }
    catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

module.exports = profileRouter;