import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
    const user = ref({
        token: sessionStorage.getItem("TOKEN"),
        data: {},
    })
    return { user };
});

