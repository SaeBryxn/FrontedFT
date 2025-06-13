<template>
  <div class="dispatch-table">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Created</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Terminal</th>
        <th>For release</th>
        <th>Cargo</th>
      </tr>
      </thead>
      <tbody>
      <DispatchRow
          v-for="order in paginatedOrders"
          :key="order.id"
          :order="order"
          @released="markAsReleased(order.id)"
      />
      </tbody>
    </table>

    <div class="pagination">
      <div class="left">
        <span>Items per page: {{ itemsPerPage }}</span>
        <span>{{ itemsStart }} - {{ itemsEnd }} of {{ props.orders.length }} items</span>
      </div>
      <div class="right">
        <span>{{ page.toString().padStart(2, '0') }} of {{ totalPages.toString().padStart(2, '0') }} pages</span>
        <button @click="prevPage" :disabled="page === 1">‹</button>
        <button @click="nextPage" :disabled="page === totalPages">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DispatchRow from './DispatchRow.vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['release'])

const page = ref(1)
const itemsPerPage = 13

const totalPages = computed(() => Math.ceil(props.orders.length / itemsPerPage))

const paginatedOrders = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  return props.orders.slice(start, start + itemsPerPage)
})

const itemsStart = computed(() => (page.value - 1) * itemsPerPage + 1)
const itemsEnd = computed(() => {
  const end = page.value * itemsPerPage
  return end > props.orders.length ? props.orders.length : end
})

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function markAsReleased(orderId) {
  emit('release', orderId)
}
</script>

<style scoped>
.dispatch-table {
  width: 100%;
  background-color: #0c1c2f;
  border-radius: 10px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 0.875rem;
}

thead {
  background-color: #1a2f45;
  color: #cbd5e1;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #1f2d44;
}

th:first-child,
td:first-child {
  width: 50px;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #152238;
  font-size: 0.875rem;
  color: #cbd5e1;
}

.pagination .left span {
  margin-right: 1rem;
}

.pagination .right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pagination button {
  background: none;
  border: none;
  color: #22c55e;
  font-size: 1.25rem;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
