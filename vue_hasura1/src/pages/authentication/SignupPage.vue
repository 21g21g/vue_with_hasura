<script setup>
import { gql } from 'graphql-tag'
import {useMutation} from "@vue/apollo-composable"
import { ref } from "vue";
const userName=ref("")


const email=ref("")
const password=ref("")
const handleSubmit=async()=>{
       await addUser({userName:userName.value,email:email.value,password:password.value})
    console.log("you submit succesfully")
    const values={
        userName:userName.value,
        email:email.value,
        password:password.value,
    }
    console.log(values)
}
const {mutate:addUser}=useMutation(gql
`mutation inserUser($userName:String!,$email:String!,$password:String!){
  insert_user(objects:{userName:$userName,email:$email,password:$password}){
    returning{
      userName,
      email,
      password,
    }
  }
}`)
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4 flex flex-col">
      <input class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" v-model="userName">
      <input class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" v-model="email">
      <input class="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" v-model="password">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
      <p class="text-sm text-gray-600 mt-2">Already have an account? <router-link class="text-blue-500" to="/login">Login</router-link></p>
    </form>
  </div>
</template>