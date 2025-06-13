<template>
  <section class="conciliations-dashboard">
    <!-- Header con KPIs y botones -->
    <ConciliationsHeader
        :totalOrders="orders.length"
        :totalApproved="getStatusCount('Approved')"
        :totalRequested="getStatusCount('Requested')"
        @open-load="showModal = true"
        @clear="handleClearDocument"
        @filter="handleFilter"
        @range="handleDateRange"
    />

    <!-- Modal para subir documento -->
    <LoadDocumentModal
        v-model="showModal"
        @submit="handleSubmitFiles"
    />

    <!-- Tabla de conciliaciones -->
    <ConciliationTable
        :orders="orders"
        @approve="handleApprove"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ConciliationsHeader from '../components/ConciliationsHeader.vue'
import ConciliationTable from '../components/ConciliationTable.vue'
import LoadDocumentModal from '@/domains/supplier/conciliations/components/LoadDocumentModal.vue'
import { getConciliations, approveOrder } from '../services/conciliationService.js'
import { log, error as logError } from '@/services/logger'

// Estado de órdenes y modal
const orders = ref([])
const showModal = ref(false)

// Obtener órdenes al montar
onMounted(async () => {
  orders.value = await getConciliations()
})

// Contador por estado
function getStatusCount(status) {
  return orders.value.filter(order => order.status === status).length
}

// Acción de aprobar
function handleApprove(order) {
  order.status = 'Approved'
  order.approved = true
  order.approvable = false

  approveOrder(order.id)
      .then(() => log(`Orden ${order.id} aprobada correctamente.`))
      .catch(err => logError(`Error al aprobar orden ${order.id}:`, err))
}

// Acciones del modal
function handleSubmitFiles(files) {
  log('Archivos cargados:', files)
  showModal.value = false
}

function handleClearDocument() {
  log('🗑 Documento limpiado')
}

function handleFilter() {
  log('🎛 Filtro aplicado')
}

function handleDateRange() {
  log('📅 Rango de fechas activado')
}
</script>

<style scoped>
.conciliations-dashboard {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}
</style>
