import { defineStore } from "pinia";
import axiosClient from "../axios";

export const useProductStore = defineStore("products", {
    state: () => ({
        products: {
            loading: false,
            data: [],
            links: [],
            from: null,
            to: null,
            page: 1,
            limit: null,
            total: null
        },
    }),

    actions: {
        async getProducts(url = null, options = {}) {
            this.products.loading = true;
            url = url || "/product";
            const params = {
                per_page: options.perPage || 10,
                search: options.search || ''
            };
            try {
                const response = await axiosClient.get(url, {params});
                this.products = {
                    data: response.data,
                    links: response.data.meta.links,
                    from: response.data.meta.from,
                    to: response.data.meta.to,
                    page: response.data.meta.current_page,
                    limit: response.data.meta.per_page,
                    total: response.data.meta.total,
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.products.loading = false;
            }
        },
    },
});
