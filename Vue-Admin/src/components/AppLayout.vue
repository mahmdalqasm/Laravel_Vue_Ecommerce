<template>

    <div class="min-h-full flex bg-gray-200">
        <Sidebar />
        <div class="flex-1">
            <TopHeader />
            <!-- content -->
            <main class="p-6">
                    <router-view></router-view>
            </main>
            <!-- content -->
        </div>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import TopHeader from './TopHeader.vue';

const { title } = defineProps({
    title: "string",
});
</script>
<style></style>
