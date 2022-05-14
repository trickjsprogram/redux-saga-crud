import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get(`http://localhost:5000/users`);

export const createUserApi = async (user) =>
  await axios.post(`http://localhost:5000/users`, user);

export const deleteUserApi = async (id) =>
  await axios.delete(`http://localhost:5000/users/${id}`);

export const updateUserApi = async (id, user) =>
  await axios.put(`http://localhost:5000/users/${id}`, user);
