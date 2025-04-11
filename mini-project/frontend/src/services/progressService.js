import axios from 'axios';

const API_URL = '/api/progress';

const getProgress = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getProgressByLabId = async (labId) => {
  const response = await axios.get(`${API_URL}/${labId}`);
  return response.data;
};

const createProgress = async (progressData) => {
  const response = await axios.post(API_URL, progressData);
  return response.data;
};

const updateProgress = async (id, progressData) => {
  const response = await axios.put(`${API_URL}/${id}`, progressData);
  return response.data;
};

const deleteProgress = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getProgress,
  getProgressByLabId,
  createProgress,
  updateProgress,
  deleteProgress
};