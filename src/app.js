const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Ensures that the API can be accessed by the frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Read JSON data from the request body
app.use(express.json());

// Read cookie from the request body
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use("/", userRouter);






connectDB().then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.error("Database connection failed", err);
})




