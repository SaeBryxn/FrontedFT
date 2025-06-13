<template>
  <div class="weekly-chart grid gap-4 md:grid-cols-2">
    <!-- Gráfico de Consumo por tipo de combustible -->
    <Card class="p-3 shadow-1 border-round-xl">
      <template #title>
        <div class="text-xl font-semibold text-primary">
          Consumo por tipo de combustible
        </div>
      </template>
      <template #content>
        <Dropdown
            v-model="selectedTerminal"
            :options="terminals"
            optionLabel="label"
            optionValue="value"
            class="mb-3 w-full md:w-14rem"
        />
        <EChart :option="barChartOptions" autoresize style="height: 280px" />
      </template>
    </Card>

    <!-- Gráfico de Volumen total -->
    <Card class="p-3 shadow-1 border-round-xl">
      <template #title>
        <div class="text-xl font-semibold text-primary">
          Volumen total despachado (galones)
        </div>
      </template>
      <template #content>
        <EChart :option="lineChartOptions" autoresize style="height: 280px" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'
import EChart from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  LineChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

// Registrar ECharts
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

// Terminales disponibles
const terminals = [
  { label: 'Callao', value: 'Callao' },
  { label: 'Pisco', value: 'Pisco' },
  { label: 'Lurín', value: 'Lurín' },
  { label: 'Ilo', value: 'Ilo' }
]

const selectedTerminal = ref('Callao')

// Días de la semana
const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// Datos por terminal
const chartSource = {
  DieselB5: {
    Callao: [100, 80, 95, 85, 110, 130, 70],
    Pisco: [120, 95, 130, 110, 150, 180, 90],
    Lurín: [90, 100, 95, 105, 100, 90, 110],
    Ilo: [85, 70, 90, 95, 80, 100, 120]
  },
  GLP: {
    Callao: [60, 50, 70, 65, 85, 95, 55],
    Pisco: [80, 60, 90, 85, 95, 100, 70],
    Lurín: [40, 60, 65, 50, 70, 75, 60],
    Ilo: [55, 45, 60, 65, 70, 85, 50]
  },
  GNV: {
    Callao: [40, 60, 35, 55, 60, 70, 35],
    Pisco: [50, 70, 40, 65, 75, 85, 40],
    Lurín: [45, 50, 55, 40, 60, 50, 55],
    Ilo: [30, 40, 35, 45, 50, 55, 45]
  }
}

// Refs para las opciones de los charts
const barChartOptions = ref({})
const lineChartOptions = ref({})

// Función para actualizar ambos charts cuando cambia la terminal
const updateCharts = () => {
  const getData = (fuel) =>
      chartSource[fuel]?.[selectedTerminal.value] ?? []

  // Gráfico de barras por tipo de combustible
  barChartOptions.value = {
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: ['DieselB5', 'GLP', 'GNV'].map((fuel, i) => ({
      name: fuel,
      type: 'bar',
      stack: 'combustible',
      emphasis: { focus: 'series' },
      data: getData(fuel),
      itemStyle: {
        color: ['#3b82f6', '#22c55e', '#facc15'][i] // azul, verde, amarillo
      }
    }))
  }

  // Gráfico de línea total
  const total = labels.map((_, i) =>
      ['DieselB5', 'GLP', 'GNV'].reduce((sum, fuel) => sum + getData(fuel)[i], 0)
  )

  lineChartOptions.value = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: [{
      name: 'Total galones',
      type: 'line',
      smooth: true,
      data: total,
      areaStyle: {},
      lineStyle: { color: '#0ea5e9' },
      itemStyle: { color: '#0ea5e9' }
    }]
  }
}

// Actualiza los charts al montar y al cambiar terminal
watch(selectedTerminal, updateCharts, { immediate: true })
</script>

<style scoped>
.weekly-chart {
  width: 100%;
  padding: 1rem;
}
</style>
