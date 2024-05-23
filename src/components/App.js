import React from 'react';
import ProjectAssignments from './ProjectAssignments.js';
import AddEmployee from './AddEmployee.js';
import AddProject from './AddProject.js';
import AddProjectAssignment from './AddProjectAssignment.js';
import '../style.css';

function App() {
    return (
        <div>
            <h1>Project Dashboard</h1>
            <ProjectAssignments />
            <AddEmployee />
            <AddProject />
            <AddProjectAssignment />
        </div>
    );
}

export default App;