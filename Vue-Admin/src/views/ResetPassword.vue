<template>
<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Set New Password</h2>

    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="New Password"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Repeat Password</label>
        <input
          type="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Repeat Password"
        />
      </div>

      <div class="flex items-center justify-between">
        <router-link :to="{name:'login'}" class="text-sm text-indigo-600 hover:text-indigo-500">Go Back To Login</router-link>
      </div>

      <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        Submit
      </button>
    </form>
  </div>
</div>
</template>
<script></script>
