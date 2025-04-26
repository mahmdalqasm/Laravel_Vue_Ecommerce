import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // from .env file to select the specific path to all requests
    withCredentials: true, // allow to send Cookie files with all requests
    headers: {
        Accept: "application/json", // مهم لطلبات API
        "Content-Type": "application/json",
    },
});

// function to make sure the user have right token when he do any request
axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("TOKEN"); // قراءة الـ token مباشرة من sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle the response by return it if it is correct or shows an error if it incorrect
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("TOKEN"); // remove token when status is unauthorized
            router.push({ name: "login" });
        }
        throw error; // throw error to other pages to handle it by them
    }
);

export default axiosClient;
