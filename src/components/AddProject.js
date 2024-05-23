import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

function AddProject() {
    const [project, setProject] = useState({ project_code: '', project_name: '', project_description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/projects', project);

            setProject({ project_code: '', project_name: '', project_description: '' });
            console.log("Project added:", response.data);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

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
