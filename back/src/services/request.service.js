// services/request.service.js
import { Request } from "../models/Requests.js";

export const getAllRequestsService = async ({ page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;

  const [requests, total] = await Promise.all([
    Request.find().skip(skip).limit(limit),
    Request.countDocuments(),
  ]);

  return {
    data: requests,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRequestByIdService = async (id) => {
  const request = await Request.findOne({ id });
  if (!request) throw new Error("Solicitud no encontrada");
  return request;
};

export const createRequestService = async (data) => {
  return await Request.create(data);
};

export const updateRequestService = async (id, updates) => {
  const request = await Request.findOneAndUpdate({ id }, updates, {
    new: true,
  });
  if (!request) throw new Error("Solicitud no encontrada");
  return request;
};

export const deleteRequestService = async (id) => {
  const deleted = await Request.findOneAndDelete({ id });
  if (!deleted) throw new Error("Solicitud no encontrada");
  return { deleted: true };
};
