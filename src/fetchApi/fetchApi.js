import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1';

const getToken = async () => {
  try {
    const response = await axios.get('/token');
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async page => {
  try {
    const response = await axios.get(`/users?page=${page}&count=6`);
    return response.data;
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

export const fetchPositions = async () => {
  try {
    const response = await axios.get(`/positions`);
    return response.data;
  } catch (e) {
    toast.error(e.message);
    console.log(e);
  }
};

export const addUsers = async user => {
  try {
    const token = await getToken();
    const response = await axios.post('/users', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token,
      },
    });
    return response.data;
  } catch (e) {
    toast.error(e.message);
    console.log(e.message);
  }
};
