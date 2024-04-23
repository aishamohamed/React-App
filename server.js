// Import express
require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");

// Create an Express application
const app = express()

// Define the port to run the server on
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use(express.json()); // For parsing application/json

// connect to mongo 
mongoose.connect(CONNECTION_URL)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Serve static files from the 'dist' directory
app.use(express.static("dist"));


// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
});