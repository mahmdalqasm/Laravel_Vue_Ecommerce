<template>
    <header class="h-14 shadow bg-white flex justify-between items-center">
        <button @click="emit('toggle-sidebar')" class="p-4 hover:bg-black/10 transition-colors">
            <Bars3Icon class="w-6" />
        </button class="p-4 text-gray-700">
        <div class="px-4">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton class="flex items-center">
                        <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="" class="rounded-full w-8 mr-2">
                        <small>{{ currentUser }}</small>
                        <ChevronDownIcon class="h-5 w-5 text-violet-200 hover:text-indigo-600" aria-hidden="true" />
                    </MenuButton>
                </div>

                <transition enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <MenuItems
                        class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                            <button :class="[
                                active ? 'bg-indigo-700 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]">
                                <UserIcon :active="active" class="mr-2 h-5 w-5 text-indigo-600" aria-hidden="true" />
                                Profile
                            </button>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                            <button v-if="userStore.user.token" @click="onLogout" :class="[
                                active ? 'bg-indigo-700 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]">
                                <ArrowLeftStartOnRectangleIcon :active="active" class="mr-2 h-5 w-5 text-indigo-600"
                                    aria-hidden="true" />
                                Logout
                            </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </header>
</template>

<script setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/vue/24/outline"
import { UserIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { computed, reactive } from "vue";

const router = useRouter();
const userStore = useUserStore();



async function onLogout() {
  try {
    await userStore.logout()
    router.push({ name: 'login' })
  } catch (err) {
    console.error('خطأ أثناء تسجيل الخروج', err)
  }
}

//add emit to provide parent -AppLayout- access on toggle which can (close/open) sidebar
const emit = defineEmits(["toggle-sidebar"]);

// get name of user from user.js store
const currentUser = computed(() => {
    return userStore.user.data?.data?.name;
})

const { title } = defineProps({
    title: "string",
});

</script>
