<template>
<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Request New Password</h2>

    <form class="space-y-4">
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

    <div class="mt-6 text-center text-sm text-gray-600">
      Don't have an account?
      <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
    </div>
  </div>
</div>
</template>
<script></script>
