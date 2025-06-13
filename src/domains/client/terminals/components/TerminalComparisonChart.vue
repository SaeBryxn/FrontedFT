<template>
  <Card class="comparison-chart-card">
    <template #title>
      <div class="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3">
        <span class="text-xl font-semibold text-primary">
          Comparación de Terminales
        </span>
        <Dropdown
            v-model="selectedMetric"
            :options="metrics"
            optionLabel="label"
            placeholder="Seleccionar métrica"
            class="w-full md:w-14rem"
            inputId="metric-selector"
        />
      </div>
    </template>

    <template #content>
      <Bar :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import { getTerminals, getOrders } from '../services/terminalService.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const terminals = ref([])
const orders = ref([])

const selectedMetric = ref('volume')
const metrics = [
  { label: 'Volumen (galones)', value: 'volume' },
  { label: 'N° de Órdenes', value: 'orders' }
]

onMounted(async () => {
  terminals.value = await getTerminals()
  orders.value = await getOrders()
})

const fuels = ['DieselB5', 'GLP', 'GNV']
const colors = {
  DieselB5: '#0ea5e9',
  GLP: '#22c55e',
  GNV: '#f59e0b'
}

const chartData = computed(() => {
  const labels = terminals.value.map(t => t.name)

  const datasets = fuels.map(fuel => {
    const data = labels.map(name => {
      const relatedOrders = orders.value.filter(o => o.terminal === name)
      return selectedMetric.value === 'volume'
          ? relatedOrders.reduce((sum, o) => {
            const p = o.products.find(p => p.product === fuel)
            return sum + (p?.quantity || 0)
          }, 0)
          : relatedOrders.filter(o => o.products.some(p => p.product === fuel)).length
    })

    return {
      label: fuel,
      data,
      backgroundColor: colors[fuel]
    }
  })

  return { labels, datasets }
})

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: ctx =>
            selectedMetric.value === 'volume'
                ? `${ctx.dataset.label}: ${ctx.formattedValue} gal`
                : `${ctx.dataset.label}: ${ctx.formattedValue} órdenes`
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: v =>
            selectedMetric.value === 'volume'
                ? `${v} gal`
                : `${v} órdenes`
      }
    }
  }
}))
</script>

<style scoped>
.comparison-chart-card {
  margin-top: 2rem;
  background: var(--surface-card);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-2);
  padding: 1rem;
}
</style>
