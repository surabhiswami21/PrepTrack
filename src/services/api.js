import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081",
});

export const getApiErrorMessage = (error, fallback = "Request failed.") => {
    const status = error.response?.status;
    if (status === 401) return "Session expired. Please login again.";
    if (status === 403) return "Access denied. Please check authentication/authorization.";
    if (status === 404) return "Requested API/data was not found.";
    if (status >= 500) return "Server error. Check backend.";
    return fallback;
};

// ================================
// REQUEST INTERCEPTOR
// ================================

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("jwtToken");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);

// ================================
// RESPONSE INTERCEPTOR
// ================================

api.interceptors.response.use(

    (response) => {

        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem(
                "jwtToken"
            );

            localStorage.removeItem(
                "user"
            );

            // Login page par bhejna
            if (
                window.location.pathname !==
                "/login"
            ) {
                window.location.href =
                    "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;