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
import { ref,onMounted,onUnmounted } from "vue";
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';


// add new variable to control (open/close) sidebar
const sidebarOpened = ref(true);

// no comment
const { title } = defineProps({
    title: "string",
});


// create toggle for sidebar
function ToggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value
}

// change status of sidebar depended on window.outerwidth
function handleSidebarOpened() {
    if (window.outerWidth <= 768) {
        sidebarOpened.value = false
    } else {
        sidebarOpened.value = true
    }
}

// run function when mounted hook and when user do resize for screen
onMounted(() => {
     handleSidebarOpened()
    window.addEventListener("resize",  handleSidebarOpened);
})


// remove the event when on unmounted hook
onUnmounted(() => {
    window.removeEventListener("resize", handleSidebarOpened);
})

</script>
<style></style>
