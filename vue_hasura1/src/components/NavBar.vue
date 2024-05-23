<script setup>
</script>
<template>
  <div class="flex w-full bg-black text-white items-start p-3">
    <div class="flex justify-between w-full px-2">
      <h1 class="text-xl font-bold">gebTodo</h1>
      <ul class="flex gap-4">
        <li><router-link to="/register" class="text-white hover:text-gray-300">Register</router-link></li>
        <li><router-link to="/login" class="text-white hover:text-gray-300">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>