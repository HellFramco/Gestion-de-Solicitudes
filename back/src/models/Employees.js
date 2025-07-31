import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    fechaIngreso: { type: Date, required: true },
    salario: { type: Number, required: true },
  },
  {
    timestamps: false,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
