<template>
  <div class="analytics-dashboard">
    <AnalyticsHeader />

    <Card class="mb-4">
      <template #title>Operadores destacados</template>
      <template #content>
        <OperatorList :orders="orders" />
      </template>
    </Card>

    <Card>
      <template #title>
      </template>
      <template #content>
        <WeeklyChart :terminal="selectedTerminal" :orders="orders" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AnalyticsHeader from '../components/AnalyticsHeader.vue'
import OperatorList from '../components/OperatorList.vue'
import WeeklyChart from '../components/WeeklyChart.vue'
import { getOrders } from '@/domains/client/orders/services/orderService'
import { error as logError } from '@/services/logger'
import Dropdown from 'primevue/dropdown'
import Card from 'primevue/card'

// Terminales disponibles
const terminalOptions = [
  { label: 'Callao', value: 'Callao' },
  { label: 'Lurín', value: 'Lurín' },
  { label: 'Pisco', value: 'Pisco' },
  { label: 'Monte Azul', value: 'Monte Azul' }
]

const selectedTerminal = ref('')
const orders = ref([])

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } catch (error) {
    logError('❌ Error al cargar órdenes en analytics:', error)
  }
})
</script>

<style scoped>
.analytics-dashboard {
  padding: 2rem;
  background-color: var(--surface-ground);
}
</style>
