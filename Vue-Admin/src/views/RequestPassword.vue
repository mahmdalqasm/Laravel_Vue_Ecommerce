<template>
<GuestLayout title="Request New password">
    <form class="space-y-4"  @submit.prevent="" method="post">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div class="flex items-center justify-between">
        <router-link :to="{name:'login'}" class="text-sm text-indigo-600 hover:text-indigo-500">Remember Your Password?</router-link>
      </div>

      <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        Submit
      </button>
    </form>
</GuestLayout>
</template>
<script setup>
import GuestLayout from '../components/GuestLayout.vue';

</script>
