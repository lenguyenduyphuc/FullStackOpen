import axios from "axios";
const baseUrl = "/api/login";

export const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}
