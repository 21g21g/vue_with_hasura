<script setup>
import { gql } from 'graphql-tag'
import {useMutation, useQuery} from "@vue/apollo-composable"
import { onMounted, ref, watch } from 'vue'

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
const search=ref("")
const filteredTodo=ref(result?result.todo:[])
// watch(result,()=>{

// onMounted(()=>{
//   if(result?.value){
//     filteredFunction()
//   }
  

// })
const filteredFunction=()=>{
   if (!result?.todo) {
    return; 
  }
  console.log(search.value)
  console.log("filtering")
  const searchTerm=search.value.toLowerCase().trim()
  console.log(searchTerm)
  if(!searchTerm){
    filteredTodo.value=result?.todo||[]
  }
  else{
    filteredTodo.value=result?.todo.filter((todo)=>todo.title.toLowerCase().includes(searchTerm))||[]
  }
  console.log(filteredTodo.value)
  console.log(result.value)

}
watch(search,filteredFunction)

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
  <div class="mt-2 flex flex-col w-full">
    <div class="flex self-end p-3">
        <input class="px-4 py-2 border " type="text" placeholder="search by name" v-model="search">
        <!-- <button @click="filteredFunction">search</button> -->

    </div>
     <table class="w-full border-collapse border mt-2">
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