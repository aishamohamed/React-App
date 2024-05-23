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


app.get('/api/project_assignments', async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
            .populate('employee_id')
            .populate('project_code');

        
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