<template>
    <GuestLayout title="Sign In Your Account">
        <form class="space-y-4 mt-8" @submit.prevent="onSubmit" method="post">
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 text-red-500 rounded text-lg leading-6 font-medium">
                {{ errorMsg }}
                <span @click="errorMsg = ''"
                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </span>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="form.email" type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="your@email.com" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input v-model="form.password" type="password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Your Password" />
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <input v-model="form.remember" type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <router-link :to="{ name: 'requestPassword' }"
                    class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</router-link>
            </div>
            <div>
                <button type="submit" :disabled="loading" :class="{ 'cursor-not-allowed': loading }"
                    class="relative w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center"
                    @click="onSubmit">
                    <!-- Spinner -->
                    <svg v-if="loading" class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm5.657 3.343a1 1 0 0 1 1.414 1.414L17.414 8.414a1 1 0 1 1-1.414-1.414l1.657-1.657zM21 11a1 1 0 1 1 0 2h-3a1 1 0 0 1 0-2h3zm-3.343 5.657a1 1 0 0 1-1.414 1.414L16.586 17.414a1 1 0 0 1 1.414-1.414l1.657 1.657zM13 21a1 1 0 0 1-2 0v-3a1 1 0 0 1 2 0v3zm-5.657-3.343a1 1 0 0 1-1.414-1.414L7.414 16.586a1 1 0 0 1 1.414 1.414L7.171 17.657zM3 13a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2H3zm3.343-5.657A1 1 0 1 1 4.929 5.93l1.657 1.657A1 1 0 0 1 6.343 7.343z" />
                    </svg>

                    <span>{{ loading ? 'Loading...' : 'Sign In' }}</span>
                </button>
            </div>
        </form>
    </GuestLayout>
</template>
<script setup>
import GuestLayout from "../components/GuestLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const errorMsg = ref("");
const form = ref({
    email: "",
    password: "",
    remember: false,
});

async function onSubmit() {
    loading.value = true
    errorMsg.value = ''

    const payload = {
        email: form.value.email,
        password: form.value.password,
        remember: form.value.remember
    }

    try {
        await userStore.login(payload)
        loading.value = false
        router.push('/app/dashboard')
    }
    catch (err) {
        loading.value = false
        const status = err.response.status
        const data = err.response.data || {}
        if (status === 422 && data.errors) {
            // أخطاء Validation
            errorMsg.value = Object.values(data.errors).flat().join('')
        }
        else if (status === 401) {
            // بيانات الاعتماد خاطئة
            errorMsg.value = data.message
        }
        else {
            // أي خطأ آخر
            errorMsg.value = data.message
        }
    }
}
</script>
