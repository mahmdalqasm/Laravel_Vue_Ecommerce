import { defineStore } from "pinia";
import axiosClient from "../axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            data: null,
            token: sessionStorage.getItem("TOKEN") || null,
        },
    }),
    actions: {
        async getCurrentUser() {
            const response = await axiosClient.get("/user");
            this.user.data = response.data;
            return response.data;
        },

        async login(credentials) {
            const response = await axiosClient.post("/login", credentials);
            this.user.data = response.data.user;
            this.user.token = response.data.token;
            sessionStorage.setItem("TOKEN", response.data.token);
            return response.data;
        },

        async logout() {
            const response = await axiosClient.post("/logout");
            this.user.token = null;
            sessionStorage.removeItem("TOKEN");
            return response;
        },
    },
});
