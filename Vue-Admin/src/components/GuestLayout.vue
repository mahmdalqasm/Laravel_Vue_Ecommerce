<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                {{ title }}
            </h2>

            <slot></slot>
            <div class="mt-6 text-center text-sm text-gray-600">
                Don't have an account?
                <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-500 font-medium"
                    >Sign up</a
                >
            </div>
        </div>
    </div>
</template>

<script setup>
const { title } = defineProps({
    title: "string"
});
</script>
<style></style>
