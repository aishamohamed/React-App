import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

function AddProjectAssignment() {
    const [assignment, setAssignment] = useState({ employee_id: '', project_code: '', start_date: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment({ ...assignment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // basic validation to check if employee_id and project_code are valid ObjectId
            if (assignment.employee_id.length !== 24 || assignment.project_code.length !== 24) {
                console.error("Invalid employee ID or project code.");
                return;
            }
            const response = await axios.post('http://localhost:3000/api/project_assignments', assignment);

            setAssignment({ employee_id: '', project_code: '', start_date: '' });
            console.log("Project assignment added:", response.data);
        } catch (error) {
            console.error("Error adding project assignment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="employee_id" placeholder="Employee ID" value={assignment.employee_id} onChange={handleChange} required />
            <input type="text" name="project_code" placeholder="Project Code" value={assignment.project_code} onChange={handleChange} required />
            <input type="date" name="start_date" placeholder="Start Date" value={assignment.start_date} onChange={handleChange} required />
            <button type="submit">Add Project Assignment</button>
        </form>
    );
}

export default AddProjectAssignment;
