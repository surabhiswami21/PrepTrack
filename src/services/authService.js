import axios from "axios";

const BASE_URL = "http://localhost:8081/api/auth";

export const registerUser = (userData) => {
    return axios.post(`${BASE_URL}/register`, userData);
};
export const loginUser = (userData) => {
    return axios.post(`${BASE_URL}/login`, userData);
};