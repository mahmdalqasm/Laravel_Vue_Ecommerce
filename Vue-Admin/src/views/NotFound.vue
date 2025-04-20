<template>
    <div class="flex justify-center items-center min-h-full min-w-full">
       <div class="flex">
         <div class="self-start text-indigo-600 text-7xl p-8 font-bold border-r pb-8">404</div>
        <div class="px-8">
            <h1 class="text-5xl font-bold mb-4">Page Not Found</h1>
            <p class="text-gray-500 font-medium mb-6">Please check the url in address bar and try again</p>
            <div>
                <router-link :to="{name: 'app-dashboard'}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-2.5 rounded-lg transition-colors">Go Back Home</router-link>
            </div>
        </div>
       </div>
    </div>
</template>
<script setup>

</script>
<style scoped></style>
