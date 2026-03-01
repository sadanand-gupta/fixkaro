import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes:{
            light:{
                colors:{
                    primary: '#667eea',
                    secondary: '#764ba2',
                    accent: '#FFD700',
                    success: '#10b981',
                    error: '#ef4444',
                    warning: '#f59e0b',
                    info: '#3b82f6',
                    surface: '#ffffff',
                    background: '#f8f9fa',
                }
            }
        }
    },
})

createApp(App).use(vuetify).mount('#app')
