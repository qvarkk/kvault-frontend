import { createApp } from "vue"
import { createPinia } from "pinia"
import { createHead } from "@vueuse/head"

import App from "./App.vue"
import router from "./router"
import i18n from "./i18n"

const appName = import.meta.env.VITE_APP_NAME ?? "kvault"
const head = createHead({
  titleTemplate: (title) => (title ? `${title} - ${appName}` : appName),
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)

app.mount("#app")
