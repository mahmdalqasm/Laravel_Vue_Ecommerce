<template>
    <div class="w-[200px] bg-indigo-700 text-white py-4 px-2 transition-all">
            <router-link class="font-semibold flex items-center content-center py-2 px-3 rounded transition-colors hover:bg-black/20" :to="{name: 'app-dashboard'}">
                <span class="mr-3 text-gray-300">
                    <HomeIcon class="w-6" />
                </span>
                <span class="mt-1.5 text-base">Dashboard</span>
            </router-link>
            <router-link class="font-semibold flex items-center content-center py-2 px-3 rounded transition-colors hover:bg-black/20" :to="{name: 'app-products'}">
                <span class="mr-3 text-gray-300">
                    <ShoppingCartIcon class="w-6" />
                </span>
                <span class="mt-1.5 text-base">Products</span>
            </router-link>
            <router-link class="font-semibold flex items-center content-center py-2 px-3 rounded transition-colors hover:bg-black/20" :to="{name: 'app-users'}">
                <span class="mr-3 text-gray-300">
                    <UsersIcon class="w-6" />
                </span>
                <span class="mt-1.5 text-base">Users</span>
            </router-link>
            <router-link class="font-semibold flex items-center content-center py-2 px-3 rounded transition-colors hover:bg-black/20" :to="{name: 'app-report'}">
                <span class="mr-3 text-gray-300">
                    <ChartBarIcon class="w-6" />
                </span>
                <span class="mt-1.5 text-base">Report</span>
            </router-link>
        </div>
</template>

<script setup>
import { HomeIcon, UsersIcon,ShoppingCartIcon, ChartBarIcon } from  '@heroicons/vue/24/solid';
const { title } = defineProps({
    title: "string"
});
</script>
