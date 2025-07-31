// routes/request.routes.js
import express from "express";
import {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/", getRequests);
router.get("/:id", getRequest);
router.post("/", createRequest);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
