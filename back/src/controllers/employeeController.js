import {
  getAllEmployeesService,
  getEmployeeByIdService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/employee.service.js";

export const getEmployees = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllEmployeesService({ page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await getEmployeeByIdService(Number(id));
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const employee = await createEmployeeService(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await updateEmployeeService(Number(id), req.body);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteEmployeeService(Number(id));
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
