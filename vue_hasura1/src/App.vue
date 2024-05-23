<script setup>
import NavBar from "./components/NavBar.vue"
import FormInput from "./pages/FormInput.vue"
import TodoDisplay from "./pages/TodoDisplay.vue"
</script>

<template>
  <div>
   <NavBar/>

    <FormInput/>
  
    <TodoDisplay/>
        <router-view></router-view>
</div>
    
    
  
</template>

