import axios from 'axios';

const API_URL = 'http://localhost:3600/api/users';

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const login = async ( username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, email, password });
    localStorage.setItem('token', response.data.token);  
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please login.');
  }

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
