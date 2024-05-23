import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true ,  unique: true},
  hashed_password: { type: String }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
