import api from "./api";

const BASE_URL = "/api/auth";

// ================================
// REGISTER
// ================================

export const registerUser = (userData) => {

    return api.post(
        `${BASE_URL}/register`,
        userData
    );
};


// ================================
// LOGIN
// ================================

export const loginUser = async (userData) => {

    const response = await api.post(
        `${BASE_URL}/login`,
        userData
    );

    /*
     * Backend response:
     *
     * {
     *   token: "...",
     *   message: "Login Successful"
     * }
     */

    const token =
        response.data.token;

    // JWT save
    localStorage.setItem(
        "jwtToken",
        token
    );

    return response;
};


// ================================
// LOGOUT
// ================================

export const logoutUser = () => {

    localStorage.removeItem(
        "jwtToken"
    );

    localStorage.removeItem(
        "user"
    );
};


// ================================
// GET TOKEN
// ================================

export const getToken = () => {

    return localStorage.getItem(
        "jwtToken"
    );
};


// ================================
// CHECK LOGIN
// ================================

export const isLoggedIn = () => {

    return !!localStorage.getItem(
        "jwtToken"
    );
};