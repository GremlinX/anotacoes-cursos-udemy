import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importa o CSS do Bootstrap (necessário)
import 'bootstrap/dist/css/bootstrap.min.css'

// Importa o JS do Bootstrap se precisar de popovers, modais etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
