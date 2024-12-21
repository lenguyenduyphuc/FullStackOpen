import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

export const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createBlogs = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response.data);
  return response.data;
};

export const updateBlogs = async (objectToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${objectToUpdate.id}`,
    objectToUpdate,
    config
  );
  return response.data;
};

export const removeBlogs = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export const updatedComment = async ({id, comment}) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment}, config)
  return response.data
}

export default {
  setToken,
};
