const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namstedev:R6UyIXPEzGelKOez@namsatenode.0sund.mongodb.net/");
}

module.exports = connectDB;    
