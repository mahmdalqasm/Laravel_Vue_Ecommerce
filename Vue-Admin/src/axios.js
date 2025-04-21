import axios from "axios";
import router from "./router";
import { useAuth } from "../stores/Auth.js";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use(config => {
    const auth = useAuth();
    config.headers.Authorization = `Bearer ${auth.user.token}`
    return config;
})

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status = 401) {
        sessionStorage.removeItem("TOKEN")
        router.push({name: "login"})
    }
    throw error;
}
)
export default axiosClient;
