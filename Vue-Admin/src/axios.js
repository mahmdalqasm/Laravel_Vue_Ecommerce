import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        Accept: "application/json", // مهم لطلبات API
        "Content-Type": "application/json",
    },
});

// طلب الـ interceptor
axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("TOKEN"); // قراءة الـ token مباشرة من sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// استجابة الـ interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("TOKEN");
            router.push({ name: "login" });
        }
        throw error;
    }
);

export default axiosClient;
