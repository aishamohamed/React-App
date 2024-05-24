import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

// Define a functional component named AddEmployee
function AddEmployee() {
    // Initialize the state with useState hook
    // The state 'employee' has three fields: full_name, email, and hashed_password
    const [employee, setEmployee] = useState({ full_name: '', email: '', hashed_password: '' });
   
    // Function to handle changes in the input fields
    const handleChange = (e) => {
        // Destructure the name and value from the event target (the input field that triggered the change)
        const { name, value } = e.target;
        // Update the state with the new value for the specific field
        setEmployee({ ...employee, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        try {
            // Make a POST request to the server with the project data
            const response = await axios.post('http://localhost:3000/api/employees', employee);
            // Log the response data from the server
            console.log("Employee added:", response.data);

            // Clear the form fields after submission
            setEmployee({ full_name: '', email: '', hashed_password: '' });
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    //Render the form
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="full_name" placeholder="Full Name" value={employee.full_name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
            <input type="password" name="hashed_password" placeholder="Password" value={employee.hashed_password} onChange={handleChange} required />
            <button type="submit">Add Employee</button>
        </form>
    );
}

export default AddEmployee;
