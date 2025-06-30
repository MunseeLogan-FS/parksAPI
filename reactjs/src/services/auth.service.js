import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8000/api/v1`
    : process.env.REACT_APP_BASE_URL;

const API_URL = "/auth/";

const signup = (email, password) => {
  return axios
    .post(`${API_BASE}${API_URL}signup`, { email, password })
    .then((response) => {
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const signin = (email, password) => {
  return axios
    .post(`${API_BASE}${API_URL}signin`, { email, password })
    .then((response) => {
      console.log("THIS IS A TEST:", response.data);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  signup,
  signin,
  getCurrentUser,
  logout,
};

export default AuthService;
