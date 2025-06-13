<template>
  <section class="dispatch-dashboard">
    <!-- Encabezado con filtros y KPIs -->
    <DispatchHeader
        :hasSelected="selectedOrderIds.length > 0"
        @release="releaseSelectedOrders"
    />

    <!-- Tabla de órdenes aprobadas -->
    <DispatchTable
        :orders="orders"
        @select="handleSelectOrder"
        @updated="fetchOrders"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApprovedOrders, markAsReleased } from '../services/dispatchService'
import DispatchHeader from '../components/DispatchHeader.vue'
import DispatchTable from '../components/DispatchTable.vue'
import { error as logError } from '@/services/logger'

const orders = ref([])
const selectedOrderIds = ref([])

async function fetchOrders() {
  try {
    orders.value = await getApprovedOrders()
  } catch (error) {
    logError('❌ Error fetching dispatch orders:', error)
  }
}

function handleSelectOrder({ id, selected }) {
  if (selected && !selectedOrderIds.value.includes(id)) {
    selectedOrderIds.value.push(id)
  } else if (!selected) {
    selectedOrderIds.value = selectedOrderIds.value.filter(o => o !== id)
  }
}

async function releaseSelectedOrders() {
  for (const id of selectedOrderIds.value) {
    await markAsReleased(id)
  }
  selectedOrderIds.value = []
  await fetchOrders()
}

onMounted(fetchOrders)
</script>

<style scoped>
.dispatch-dashboard {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}
</style>
