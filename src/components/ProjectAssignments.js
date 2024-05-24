import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';


function ProjectAssignments() {
    const [assignments, setAssignments] = useState([]); // Initialize state for assignments
    const [error, setError] = useState(null);  // Initialize state for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://localhost:3000/api/project_assignments'); // Fetch data from server
                setAssignments(result.data);  // Update state with fetched data
            } catch (err) { // Using err instead of error to avoid confusion with the state
                console.error("Error fetching project assignments:", err);
                setError("Failed to fetch data. Please try again later."); // Update error state
            }
        };

        fetchData();  // Call fetchData when component mounts
        const interval = setInterval(fetchData, 60000); // Set interval to fetch data every minute
        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);


    if (error) {
        return <div>{error}</div>; // Render error message if there's an error
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((a) => (
                    <tr key={a._id}>
                        <td>{a.employee_id._id}</td>
                        <td>{a.employee_id.full_name}</td>
                        <td>{a.project_code.project_name}</td>
                        <td>{new Date(a.start_date).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProjectAssignments;
