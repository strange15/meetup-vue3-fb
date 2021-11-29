import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
