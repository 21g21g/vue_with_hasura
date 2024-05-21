<script setup>
import { gql } from 'graphql-tag'
import {useMutation, useQuery} from "@vue/apollo-composable"
import { watch } from 'vue'

const {result,loading,error}=useQuery(gql`
query{
  todo{
    id
    title
    description
    status
  }
}

`)
watch(result,()=>{
    console.log(result.value)
})
const handleButton=(id)=>{
  console.log(id)
  deleteTodo({id})
}
const {mutate:deleteTodo}=useMutation(gql`
       mutation deleteTodoByid($id:uuid!){
           delete_todo_by_pk(id:$id){
              id
            }
        }


       
`

)
</script>
<template>
  <div class="mt-2">
    <table class="w-full border-collapse border">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td class="border px-4 py-2" colspan="4">Loading...</td>
        </tr>
        <tr v-else-if="error">
          <td class="border px-4 py-2" colspan="4">Error: {{ error.message }}</td>
        </tr>
        <tr v-else v-for="res in result?.todo || []" :key="res.id">
          <td class="border px-4 py-2">{{ res.title }}</td>
          <td class="border px-4 py-2">{{ res.description }}</td>
          <td class="border px-4 py-2">{{ res.status }}</td>
          <td class="border px-4 py-2">
            <button @click="handleButton(res.id)" class="text-red-500">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>