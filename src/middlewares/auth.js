const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {// Read the token from the req cookies
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Please Login");
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder790");

        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        //important : send user to req user
        req.user = user;
        next();

        // validate the token
        //Find the username
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
}

module.exports = {
    userAuth,
}