// routes/employeeRoutes.js
import express from "express";
import {
  getEmployees,
  getByIdEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/getAll", getEmployees);
router.get("/getById", getByIdEmployee); // Cambiado: obtener por body
router.post("/create", createEmployee); // Igual
router.put("/update", updateEmployee); // Cambiado: actualizar por body
router.delete("/delete", deleteEmployee); // Cambiado: eliminar por body

export default router;
