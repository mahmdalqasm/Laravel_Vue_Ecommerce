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
        <Spinner />
        </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Spinner from "./core/Spinner.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// add new variable to control (open/close) sidebar
const sidebarOpened = ref(true);


// get them id of user from user.js store
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
        await userStore.getCurrentUser();// return data of current user to show them in navbar
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
