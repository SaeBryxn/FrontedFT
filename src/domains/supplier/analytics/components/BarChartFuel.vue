<template>
  <Card class="chart-container">
    <template #title>
      <span class="chart-title">Fuel Volume by Type</span>
    </template>
    <template #content>
      <Bar :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import Card from 'primevue/card'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

// Volumen por tipo de combustible
const volumesByFuel = computed(() => {
  const map = {}
  props.orders.forEach(order => {
    order.products.forEach(p => {
      const type = p.product
      const qty = parseFloat(p.quantity) || 0
      map[type] = (map[type] || 0) + qty
    })
  })
  return map
})

const chartData = computed(() => ({
  labels: Object.keys(volumesByFuel.value),
  datasets: [
    {
      label: 'Gallons',
      data: Object.values(volumesByFuel.value),
      backgroundColor: '#22c55e',
      borderRadius: 6
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e2e4a',
      titleColor: '#22c55e',
      bodyColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#22c55e'
    }
  },
  scales: {
    x: {
      ticks: { color: '#cbd5e1', font: { weight: 500 } },
      grid: { color: '#1e293b' }
    },
    y: {
      ticks: { color: '#cbd5e1', font: { weight: 500 } },
      grid: { color: '#1e293b' }
    }
  }
}
</script>

<style scoped>
.chart-container {
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}
</style>
