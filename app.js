import express from 'express';
import connectDB from './config/index.js';
import userRoutes from './routes/user.routes.js';
import referralRoutes from './routes/referral.routes.js';
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const app = express();

// Connect to the database
connectDB();

// parse json request body
app.use(express.json());
// Serve static files from the "public/uploads" directory
app.use(express.static("public/uploads"));



app.use('/api/v1', userRoutes);
app.use('/api/v1', referralRoutes);


// Start the server and listen on port 7878
app.listen(process.env.PORT, () => {
    console.log("Port is running");
});
