import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App, {
  cart: [], // Initialize the cart as an empty array
  premium: false, // Set premium status to false (you can change it as needed)
});

app.mount("#app");
