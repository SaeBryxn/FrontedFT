<template>
  <div class="orders-table">
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Client</th>
        <th>Created</th>
        <th>Terminal</th>
        <th>Status</th>
        <th>Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orders" :key="order.id">
        <!-- Row principal -->
        <tr class="table-row">
          <td>{{ order.orderId }}</td>
          <td>{{ order.user }}</td>
          <td>{{ formatDate(order.created) }}</td>
          <td>{{ order.terminal }}</td>
          <td>
            <Tag :value="order.status" :severity="getSeverity(order.status)" class="status-tag" />
          </td>
          <td>{{ formatCurrency(order.amount) }}</td>
          <td>
            <Button
                @click="toggleExpanded(order.id)"
                icon="pi pi-chevron-down"
                text
                rounded
                :class="['expand-btn', expandedRows.includes(order.id) && 'rotated']"
            />
          </td>
        </tr>

        <!-- Row expandida -->
        <tr v-if="expandedRows.includes(order.id)" class="expanded-row">
          <td colspan="7">
            <table class="products-table">
              <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product, index) in order.products" :key="index">
                <td>{{ product.product }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.unit }}</td>
                <td>{{ formatCurrency(product.price) }}</td>
                <td>{{ formatCurrency(product.total) }}</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps({
  orders: Array
})

const expandedRows = ref([])

function toggleExpanded(orderId) {
  const index = expandedRows.value.indexOf(orderId)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(orderId)
  }
}

function formatCurrency(value) {
  const amount = typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.]/g, ''))
      : value || 0

  if (isNaN(amount)) return '—'

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount).replace('PEN', 'S/')
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function getSeverity(status) {
  switch (status) {
    case 'Requested': return 'info'
    case 'Approved': return 'success'
    case 'Released': return 'warning'
    case 'Dispatched': return 'help'
    case 'Closed': return 'secondary'
    default: return null
  }
}
</script>

<style scoped>
.orders-table {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  background-color: #152238;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #1e2e4a;
}

th, td {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  border-bottom: 1px solid #1f2d44;
  white-space: nowrap;
}

th {
  font-weight: 600;
  color: #cbd5e1;
}

.table-row:hover {
  background-color: #20304a;
  transition: background-color 0.2s ease-in-out;
}

.status-tag {
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
}

/* Botón de expandir */
.expand-btn {
  font-size: 1rem;
  color: #cbd5e1;
  transition: transform 0.2s ease;
}
.expand-btn.rotated :deep(i) {
  transform: rotate(180deg);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #1e2e4a;
  border-radius: 8px;
  overflow: hidden;
}

.products-table th,
.products-table td {
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #2c3e60;
}

.products-table th {
  font-weight: 600;
  color: #93b1cc;
}
</style>
