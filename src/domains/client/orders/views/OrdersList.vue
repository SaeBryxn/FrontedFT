<template>
  <section class="orders-list">
    <div class="header">
      <h1 class="text-2xl font-semibold text-surface-800 mb-4">
        {{ $t('orders.my_orders') }}
      </h1>

      <div class="flex justify-between items-center mb-3 flex-wrap gap-2">
        <FiltersPanel @filter="applyFilters" />

        <Button
            icon="pi pi-plus-circle"
            :label="$t('orders.create_order')"
            class="p-button-success"
            @click="showModal = true"
        />
      </div>
    </div>

    <!-- Tabla de órdenes -->
    <OrdersTable :orders="paginatedOrders" />

    <!-- Controles de paginación -->
    <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredOrders.length"
        :items-per-page="itemsPerPage"
        @change="handlePageChange"
        @limitChange="handleLimitChange"
    />

    <!-- Modal de creación de orden -->
    <CreateOrderModal v-if="showModal" @close="handleModalClose" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import FiltersPanel from '@/domains/client/orders/components/FiltersPanel.vue'
import OrdersTable from '@/domains/client/orders/components/OrdersTable.vue'
import PaginationControls from '@/domains/client/orders/components/PaginationControls.vue'
import CreateOrderModal from '@/domains/client/orders/components/CreateOrderModal/CreateOrderModal.vue'
import { useOrdersStore } from '../store/useOrdersStore'

const ordersStore = useOrdersStore()
const orders = computed(() => ordersStore.orders)
const currentPage = ref(1)
const itemsPerPage = ref(13)
const showModal = ref(false)

const statusFilter = ref('')
const startDateFilter = ref('')
const endDateFilter = ref('')

onMounted(async () => {
  await ordersStore.fetchOrders()
})

function applyFilters(filters) {
  statusFilter.value = filters.status
  startDateFilter.value = filters.startDate
  endDateFilter.value = filters.endDate
  currentPage.value = 1
}

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const orderDate = new Date(order.created)

    const matchStatus = !statusFilter.value || order.status === statusFilter.value
    const matchStart = !startDateFilter.value || orderDate >= new Date(startDateFilter.value)
    const matchEnd = !endDateFilter.value || orderDate <= new Date(endDateFilter.value)

    return matchStatus && matchStart && matchEnd
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredOrders.value.slice(start, start + itemsPerPage.value)
})

function handlePageChange(newPage) {
  currentPage.value = newPage
}

function handleLimitChange(newLimit) {
  itemsPerPage.value = newLimit
  currentPage.value = 1
}

async function handleModalClose() {
  showModal.value = false
  await ordersStore.fetchOrders()
}
</script>

<style scoped>
.orders-list {
  padding: 2rem;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}
</style>
