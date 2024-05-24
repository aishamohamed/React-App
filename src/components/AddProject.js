import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

// Define a functional component named AddProject
function AddProject() {
    // Initialize the state with useState hook
    // The state 'project' has three fields: project_code, project_name, and project_description
    const [project, setProject] = useState({ project_code: '', project_name: '', project_description: '' });

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        // Destructure the name and value from the event target (the input field that triggered the change)
        const { name, value } = e.target;
        // Update the state with the new value for the specific field
        setProject({ ...project, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        try {
            // Make a POST request to the server with the project data
            const response = await axios.post('http://localhost:3000/api/projects', project);
            // Reset the state to empty values after successful submission
            setProject({ project_code: '', project_name: '', project_description: '' });
            // Log the response data from the server
            console.log("Project added:", response.data);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    // Render the form
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="project_code" placeholder="Project Code" value={project.project_code} onChange={handleChange} required />
            <input type="text" name="project_name" placeholder="Project Name" value={project.project_name} onChange={handleChange} required />
            <input type="text" name="project_description" placeholder="Project Description" value={project.project_description} onChange={handleChange} required />
            <button type="submit">Add Project</button>
        </form>
    );
}

export default AddProject;
