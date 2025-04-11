import axios from 'axios';

const API_URL = '/api/labs';

// Configure axios with token interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const getLabs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getLabById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createLab = async (labData) => {
  const response = await axios.post(API_URL, labData);
  return response.data;
};

const updateLab = async (id, labData) => {
  const response = await axios.put(`${API_URL}/${id}`, labData);
  return response.data;
};

const deleteLab = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getComments = async (labId) => {
  const response = await axios.get(`/api/comments/${labId}`);
  return response.data;
};

const addComment = async (labId, text) => {
  const response = await axios.post('/api/comments', { labId, text });
  return response.data;
};

export default {
  getLabs,
  getLabById,
  createLab,
  updateLab,
  deleteLab,
  getComments,
  addComment
};