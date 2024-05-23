import { createApp,provide,h } from 'vue'
import { DefaultApolloClient } from "@vue/apollo-composable";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import {createRouter, createWebHistory} from "vue-router"
import Homepage from "./pages/Homepage.vue"
import SignupPage from "./pages/authentication/SignupPage.vue"
import SigninPage from "./pages/authentication/SigninPage.vue"
import "./style.css"
import App from './App.vue'

const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
  
    render: () => h(App),
  });
  const cache = new InMemoryCache();
  
  const apolloClient = new ApolloClient({
    cache,
    uri: "http://localhost:8080/v1/graphql",
    // uri: "https://countries.trevorblades.com",
  });
  const route=createRouter({
    history:createWebHistory(),
    routes:[
      {
      path:"/",
      component:Homepage
    },
    {
      path:"/login",
      component:SigninPage
    },
    {
      path:"/register",
      component:SignupPage
    }

  ]
  })
  app.use(route)
  app.mount('#app')
