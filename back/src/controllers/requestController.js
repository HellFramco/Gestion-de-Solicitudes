import {
  getAllRequestsService,
  getRequestByIdService,
  createRequestService,
  updateRequestService,
  deleteRequestService,
} from "../services/request.service.js";

export const getRequests = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getAllRequestsService({ page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await getRequestByIdService(Number(id));
    res.json(request);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const request = await createRequestService(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id, ...updates } = req.body;
    const request = await updateRequestService(Number(id), updates);
    res.json(request);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await deleteRequestService(Number(id));
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
