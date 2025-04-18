<template>

    <div class="min-h-full flex">
        <Sidebar />
        <div class="flex-1">
            <header class="h-8 shadow bg-white">
                <!-- header -->
            </header>
            <!-- content -->
            <main>
                <router-view></router-view>
            </main>
            <!-- content -->
        </div>
    </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';

const { title } = defineProps({
    title: "string",
});
</script>
<style></style>
