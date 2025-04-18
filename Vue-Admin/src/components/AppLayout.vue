<template>

    <div class="min-h-full flex bg-gray-200">
        <Sidebar :class="{'-ml-[200px]': !sidebarOpened}" />
        <div class="flex-1">
            <Navbar @toggle-sidebar="ToggleSidebar"></Navbar>
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
import Navbar from './Navbar.vue';
import { ref,onMounted,onUnmounted } from "vue";
const sidebarOpened = ref(true);
const { title } = defineProps({
    title: "string",
});
function ToggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
}
onMounted(() => {
     handleSidebarOpened()
    window.addEventListener("resize",  handleSidebarOpened);
})

onUnmounted(() => {
    window.removeEventListener("resize", handleSidebarOpened);
})

function handleSidebarOpened() {
    if (window.outerWidth <= 768) {
        sidebarOpened.value = false
    } else {
        sidebarOpened.value = true
    }

}
</script>
<style></style>
