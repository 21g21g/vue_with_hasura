import { createApp,provide,h } from 'vue'
import { DefaultApolloClient } from "@vue/apollo-composable";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import './style.css'
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
  app.mount('#app')
