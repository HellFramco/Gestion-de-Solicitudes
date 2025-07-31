// services/employee.service.js
import { Employee } from "../models/Employees.js";

export const getAllEmployeesService = async ({ page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const [employees, total] = await Promise.all([
    Employee.find().skip(skip).limit(limit),
    Employee.countDocuments(),
  ]);

  return {
    data: employees,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getEmployeeByIdService = async (id) => {
  const employee = await Employee.findOne({ id });
  if (!employee) throw new Error("Empleado no encontrado");
  return employee;
};

export const createEmployeeService = async (data) => {
  return await Employee.create(data);
};

export const updateEmployeeService = async (id, updates) => {
  const employee = await Employee.findOneAndUpdate({ id }, updates, {
    new: true,
  });
  if (!employee) throw new Error("Empleado no encontrado");
  return employee;
};

export const deleteEmployeeService = async (id) => {
  const deleted = await Employee.findOneAndDelete({ id });
  if (!deleted) throw new Error("Empleado no encontrado");
  return { deleted: true };
};
