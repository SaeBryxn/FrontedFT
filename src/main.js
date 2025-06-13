import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { i18n } from './i18n'
import Vue3Lottie from 'vue3-lottie'

// Estilos
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css' // Tema claro
import './assets/styles/global.css'
import 'animate.css'

// PrimeVue core + servicio de Toast
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice' // ✅ CORREGIDO

// Componentes de PrimeVue
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Steps from 'primevue/steps'
import ProgressBar from 'primevue/progressbar'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Breadcrumb from 'primevue/breadcrumb'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'
import Paginator from 'primevue/paginator'
import Toast from 'primevue/toast'

// ECharts core + componentes necesarios
import { use } from 'echarts/core'
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart,
    LineChart
} from 'echarts/charts'
import {
    TooltipComponent,
    LegendComponent,
    GridComponent,
    TitleComponent
} from 'echarts/components'

// vue-echarts
import EChart from 'vue-echarts'

// Registro de ECharts
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    TitleComponent
])

// Crear app
const app = createApp(App)

// Plugins
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(Vue3Lottie)

app.use(PrimeVue, {
    theme: {
        options: {
            darkModeSelector: 'system',
            prefix: 'p',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
})

app.use(ToastService) // ✅ REGISTRO DEL SERVICIO TOAST

// Componentes globales
app.component('Button', Button)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dialog', Dialog)
app.component('Tag', Tag)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Steps', Steps)
app.component('ProgressBar', ProgressBar)
app.component('Card', Card)
app.component('Avatar', Avatar)
app.component('Breadcrumb', Breadcrumb)
app.component('Divider', Divider)
app.component('Checkbox', Checkbox)
app.component('Paginator', Paginator)
app.component('Toast', Toast)
app.component('EChart', EChart)

app.mount('#app')
