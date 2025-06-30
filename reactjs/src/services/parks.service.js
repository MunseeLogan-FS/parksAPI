import axios from "axios";
import authHeader from "./auth-header";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

const API_URL = `/nationalParks`;

const getAllPrivateParks = () => {
  return axios.get(`${API_BASE}${API_URL}`, { headers: authHeader() });
};

const postPrivatePark = (data) => {
  return axios.post(`${API_BASE}${API_URL}`, data, {
    headers: authHeader(),
  });
};

const getPrivatePark = (id) => {
  return axios.get(`${API_BASE}${API_URL}/${id}`, { headers: authHeader() });
};

const deletePrivatePark = (id) => {
  return axios.delete(`${API_BASE}${API_URL}/${id}`, { headers: authHeader() });
};

const updatePrivatePark = (id, data) => {
  return axios.patch(`${API_BASE}${API_URL}/${id}`, data, {
    headers: authHeader(),
  });
};

const ParksService = {
  getAllPrivateParks,
  postPrivatePark,
  getPrivatePark,
  updatePrivatePark,
  deletePrivatePark,
};

export default ParksService;
