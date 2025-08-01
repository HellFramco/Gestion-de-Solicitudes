import express from "express";
import {
  getRequests,
  getById,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/getAll", getRequests);
router.get("/getById", getById); // Cambiado: buscar uno desde el body
router.post("/create", createRequest);
router.put("/update", updateRequest); // Cambiado: actualizar desde el body
router.delete("/delete", deleteRequest); // Cambiado: eliminar desde el body

export default router;
