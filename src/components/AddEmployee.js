import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

function AddEmployee() {
    const [employee, setEmployee] = useState({ full_name: '', email: '', hashed_password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/employees', employee);
            console.log("Employee added:", response.data);

            // Clear the form fields after submission
            setEmployee({ full_name: '', email: '', hashed_password: '' });
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

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
