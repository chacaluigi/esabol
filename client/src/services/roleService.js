import api from '@/api/apiConfig.js';

export const getAllRoles = async () => {
  const response = await api.get('/roles');
  return response.data;
};
