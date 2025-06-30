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

const ParksService = {
  getAllPrivateParks,
};

export default ParksService;
