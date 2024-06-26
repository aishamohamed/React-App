// routes/index.js
import Employee from '../models/Employee.js';
import Project from '../models/Project.js';
import ProjectAssignment from '../models/ProjectAssignment.js';
import mongoose from 'mongoose';

const Routes = function(app) {

    // Create a new Employee
    app.post('/api/employees', async (req, res) => {
        // Extract full_name, email, and hashed_password from the request body
        const { full_name, email, hashed_password } = req.body;
        try {
            // Create a new Employee instance with the extracted data
            const newEmployee = new Employee({ full_name, email, hashed_password });

            // Save the new employee to the database
            //.save() is an asynchronous operation that returns a promise.
            await newEmployee.save();

            // Send a 201 Created status and the new employee data as a response
            res.status(201).send(newEmployee);
        } catch (error) {
            console.log('error adding a new employee: ', error);
            res.status(400).send(error.message);
        }
    });

    // Create a new Project
    app.post('/api/projects', async (req, res) => {
        const { project_code, project_name, project_description } = req.body;
        try {
            const newProject = new Project({ project_code, project_name, project_description });
            await newProject.save();
            res.status(201).send(newProject);
        } catch (error) {
            res.status(400).send(error.message);
            console.log("Error adding new project: ",error)
        }
    });

    // Create a new Project Assignment
    app.post('/api/project_assignments', async (req, res) => {
        const { employee_id, project_code, start_date } = req.body;
        
        // Convert the employee_id and project_code to ObjectId
        const employeeObjectId = new mongoose.Types.ObjectId(employee_id);
        const projectObjectId = new mongoose.Types.ObjectId(project_code);

        // Validate the data
        if (!employeeObjectId || !projectObjectId || !start_date) {
            return res.status(400).send("All fields are required.");
        }

        // Check if the employee and project exist
        const employee = await Employee.findById(employeeObjectId);
        const project = await Project.findById(projectObjectId);

        if (!employee || !project) {
            return res.status(400).send("Invalid employee ID or project code.");
        }

        try {
            //create new project instance
            const newAssignment = new ProjectAssignment({
                employee_id: employee._id,
                project_code: project._id,
                start_date: new Date(start_date)
            });
            
            // save to the databse
            await newAssignment.save();
            // send status code and new assignment as a response
            res.status(201).send(newAssignment);
        } catch (error) {
            res.status(400).send(error.message);
            console.log('Error adding new projectassignment', error);
        }
    });
};

export default Routes;