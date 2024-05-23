<script setup>
import { ref } from "vue";
const email=ref("")
const password=ref("")
const handleSubmit=()=>{
    console.log("you click submit button")
    const value={
        email:email.value,
        password:password.value,
    }
    console.log(value)
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg px-8 py-6 flex flex-col w-80">
      <input class="mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" v-model="email">
      <input class="mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" v-model="password">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Sign in</button>
      <p class="mt-2 text-sm text-gray-600">Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link></p>
    </form>
  </div>
</template>
