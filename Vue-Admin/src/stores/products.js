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
            const perPage = options.perPage || this.products.limit || 10;
            if (url && url.includes('?')) {
                const baseUrl = url.split('?')[0];
                const urlParams = new URLSearchParams(url.split('?')[1]);
                url = baseUrl;
                options.page = urlParams.get('page') || 1;
            }

            const params = {
                per_page: perPage,
                page: options.page || this.products.page || 1,
                search: options.search || '',
                sort_field: options.sort_field || "",
                sort_direction: options.sort_direction || "",
            };

            try {
                const response = await axiosClient.get(url || "/products", { params });
                this.products = {
                    data: response.data,
                    links: response.data.meta.links,
                    from: response.data.meta.from,
                    to: response.data.meta.to,
                    page: response.data.meta.current_page,
                    limit: response.data.meta.per_page,
                    total: response.data.meta.total,
                };
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                this.products.loading = false;
            }
        },

        async createProduct(product){
            if(product.image instanceof File){
                const form = new FormData()
                form.append("title",product.title)
                form.append("image",product.image)
                form.append("description",product.description)
                form.append("pricing",product.pricing)
                product = form
            }
            return await axiosClient.post("/products",product)
        },

        async updateProduct(product){
            const id = product.id
            if(product.image instanceof File){
                const form = new FormData()
                form.append("title",product.title)
                form.append("image",product.image)
                form.append("description",product.description)
                form.append("pricing",product.pricing)
                form.append("id",product.id)
                form.append("_method","PUT")
                product = form;
            }else{
                product._method = "PUT"
            }
            return await axiosClient.post(`/products/${id}`, product)
        }

    },
});
