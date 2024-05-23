<script setup>
import { ref } from "vue";
// import gql from "graphql"
import { gql } from 'graphql-tag'
import {useMutation} from "@vue/apollo-composable"
const title=ref(null)
const description=ref(null)
const status=ref("pending ")
const handleSubmit=async()=>{
  try{
 await addTodo({title:title.value,description:description.value,status:status.value})
 
    console.log("you click the submit button")
    const values={
        title:title.value,
        description:description.value,
        status:status.value
    }
    console.log(values)
    title=null
    description=null
    status.value="pending"
    
  }catch(error){
    console.log(error)
  }
         
}
const {mutate:addTodo}=useMutation(gql`
         mutation AddTodo($title:String!,$description:String!,$status:String!){
            insert_todo(objects:{title:$title,description:$description,status:$status}){
    returning{
      id
    }
  }
                      
              
            
          }
`

)

</script>
<template>
    
    <div class="w-full mt-3"> 
        <form class="flex flex-col  w-1/2 bg-slate-500 h-1/2 ml-16" @submit.prevent="handleSubmit">
        <div class="ml-3 mt-5 flex flex-col gap-2 p-3">
            <input class="bg-slate-500 border" type="text" placeholder="enter title" v-model="title">
            <input class="bg-slate-500 border" type="text" placeholder="enter descriptions" v-model="description">
              <label for="selected-status">Selected status:-</label>
                <select class="bg-slate-500 border" v-model="status">
                  <option value="pending">pending</option>
                  <option value="canceled">canceled</option>
                  <option value="confirmed">confirmed</option>
             </select>
             <h1 v-if="status">{{status}}</h1>
             <button class="text-green-500" type="submit">Submit</button>
        </div>

        </form>


    </div>
</template>