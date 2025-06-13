<template>
  <section class="orders-management">
    <OrdersHeader
        :total-orders="allOrders.length"
        :total-approved="getStatusCount('Approved')"
        :total-requested="getStatusCount('Requested')"
    />

    <OrdersStatusChips
        :statuses="statuses"
        v-model:selected="selectedStatus"
    />

    <div class="toolbar">
      <FiltersPanel
          :selectedStatus="selectedStatus"
          @applyFilters="applyFilters"
      />
    </div>

    <OrdersTable :orders="paginatedOrders" />

    <PaginationControls
        :total="filteredOrders.length"
        :page="currentPage"
        :itemsPerPage="itemsPerPage"
        @changePage="handlePageChange"
        @update:itemsPerPage="handleItemsPerPage"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import OrdersHeader from '../components/OrdersHeader.vue'
import OrdersStatusChips from '../components/OrdersStatusChips.vue'
import FiltersPanel from '../components/FiltersPanel.vue'
import OrdersTable from '../components/OrdersTable.vue'
import PaginationControls from '../components/PaginationControls.vue'
import { getOrdersWithStatusCount } from '../services/ordersService.js'

// Estado
const selectedStatus = ref('Requested')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const allOrders = ref([])
const statuses = ref([])

// Cargar datos desde la API
async function fetchOrders() {
  const { orders, statuses: statusData } = await getOrdersWithStatusCount()
  allOrders.value = orders
  statuses.value = statusData
}
fetchOrders()

// Conteo por estado para KPI
function getStatusCount(status) {
  return allOrders.value.filter(order => order.status === status).length
}

// Filtrado por estado
const filteredOrders = computed(() =>
    allOrders.value.filter(order => order.status === selectedStatus.value)
)

// Paginación
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

// Acciones
function applyFilters() {
  currentPage.value = 1
}

function handlePageChange(newPage) {
  currentPage.value = newPage
}

function handleItemsPerPage(newLimit) {
  itemsPerPage.value = newLimit
  currentPage.value = 1
}
</script>

<style scoped>
.orders-management {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}
</style>
