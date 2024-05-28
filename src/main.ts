import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/router/permission";
import vuetify from "./vuetify";
import "./styles/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(vuetify).use(router).use(pinia).mount("#app");
