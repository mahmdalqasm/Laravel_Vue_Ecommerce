<template>
    <div v-if="currentUser" class="min-h-full flex bg-gray-200">
        <Sidebar :class="{ '-ml-[200px]': !sidebarOpened }" />
        <div class="flex-1">
            <Navbar @toggle-sidebar="ToggleSidebar"></Navbar>
            <!-- content -->
            <main class="p-6">
                <router-view></router-view>
            </main>
            <!-- content -->
        </div>
    </div>
    <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
        <div class="flex flex-col items-center">
            <svg
                class="animate-spin h-16 w-16 text-gray-700 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M12 2a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm5.657 3.343a1 1 0 0 1 1.414 1.414L17.414 8.414a1 1 0 1 1-1.414-1.414l1.657-1.657zM21 11a1 1 0 1 1 0 2h-3a1 1 0 0 1 0-2h3zm-3.343 5.657a1 1 0 0 1-1.414 1.414L16.586 17.414a1 1 0 0 1 1.414-1.414l1.657 1.657zM13 21a1 1 0 0 1-2 0v-3a1 1 0 0 1 2 0v3zm-5.657-3.343a1 1 0 0 1-1.414-1.414L7.414 16.586a1 1 0 0 1 1.414 1.414L7.171 17.657zM3 13a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2H3zm3.343-5.657A1 1 0 1 1 4.929 5.93l1.657 1.657A1 1 0 0 1 6.343 7.343z"
                />
            </svg>
            <div class="mt-2 text-gray-800">Please Wait...</div>
        </div>
        </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// add new variable to control (open/close) sidebar
const sidebarOpened = ref(true);

const currentUser = computed(() => {
    return userStore.user.data?.data?.id;
});

// no comment
const { title } = defineProps({
    title: "string",
});

// create toggle for sidebar
function ToggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

// change status of sidebar depended on window.outerwidth
function handleSidebarOpened() {
    if (window.outerWidth <= 768) {
        sidebarOpened.value = false;
    } else {
        sidebarOpened.value = true;
    }
}

// run function when mounted hook and when user do resize for screen
onMounted(async () => {
    try {
        await userStore.getCurrentUser();
    } catch (error) {
        console.error("Error fetching current user:", error);
    }
    handleSidebarOpened();
    window.addEventListener("resize", handleSidebarOpened);
});

// remove the event when on unmounted hook
onUnmounted(() => {
    window.removeEventListener("resize", handleSidebarOpened);
});
</script>
<style></style>
