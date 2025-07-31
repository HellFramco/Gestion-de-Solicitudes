// models/Requests.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    resumen: { type: String, required: true },
    id_empleado: { type: Number, required: true },
  },
  { timestamps: false }
);

export const Request = mongoose.model("Request", requestSchema);
