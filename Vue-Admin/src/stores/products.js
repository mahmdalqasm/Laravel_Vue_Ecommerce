import { defineStore } from "pinia";
import axiosClient from "../axios";

export const useProductStore = defineStore("products", {
    state: () => ({
        products: {
            loading: false,
            data: [],
        },
    }),

    actions: {
        async getProducts() {
            this.products.loading = true;
            try {
                const response = await axiosClient.get("/product");
                this.products.data = response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.products.loading = false;
            }
        },
    },
});
