// Import express
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProjectAssignment from './models/ProjectAssignment.js';
import setupRoutes from './routes/index.js';


dotenv.config();

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

// Routes
setupRoutes(app);

// Define a GET endpoint for fetching project assignments
app.get('/api/project_assignments', async (req, res) => {
    try {
        // Fetch all project assignments from the database
        const assignments = await ProjectAssignment.find()
            .populate('employee_id')      // Populate the 'employee_id' field with the related Employee document
            .populate('project_code')  // Populate the 'project_code' field with the related Project document
            .sort({ start_date: -1 }) // Sort by start_date in descending order
            .limit(5); // Limit the results to 5

        // Send the fetched assignments as a JSON response to the client
        res.json(assignments);
        //console.log('serverassignments:' + assignments);
    } catch (error) {
        console.error("Error fetching project assignments:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
});