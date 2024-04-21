// Import express
const express = require("express")

// Create an Express application
const app = express()

// Define the port to run the server on
const PORT = process.env.PORT || 3000


app.use(express.json())

// Serve static files from the 'dist' directory
app.use(express.static("dist"))


// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})