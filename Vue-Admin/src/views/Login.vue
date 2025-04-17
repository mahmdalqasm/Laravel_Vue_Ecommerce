<template>
    <GuestLayout title="Sign In Your Account">
        <form class="space-y-4 mt-8" @submit.prevent="" method="post">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Email</label
                >
                <input
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Password</label
                >
                <input
                    type="password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Your Password"
                />
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <router-link
                    :to="{ name: 'requestPassword' }"
                    class="text-sm text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</router-link
                >
            </div>

            <button
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
                Sign In
            </button>
        </form>
    </GuestLayout>
</template>
<script setup>
import GuestLayout from "../components/GuestLayout.vue";
</script>
<style scoped></style>
