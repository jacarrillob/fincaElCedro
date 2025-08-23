import './style.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({ components, directives,
    theme: {
        defaultTheme: 'light',
        themes: {
        light: {
            colors: {
            green: '#065f46', // Green
            black: '#121212', // Black
            white: '#FFFFFF', // White
            grey: '#BDBDBD', // Grey
            }
        }
        }
    }
 })


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')