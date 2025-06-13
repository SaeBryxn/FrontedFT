<template>
  <div class="conciliation-table">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Created</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Terminal</th>
        <th>Status</th>
        <th class="text-end">Action</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orders" :key="order.id">
        <!-- Fila principal -->
        <tr class="order-row">
          <td class="icon-cell">
            <Button
                icon="pi pi-chevron-down"
                text
                rounded
                @click="toggleExpanded(order.id)"
                :class="['expand-btn', isExpanded(order.id) && 'rotated']"
            />
          </td>
          <td>{{ formatDate(order.created) }}</td>
          <td>{{ order.user }}</td>
          <td>{{ formatCurrency(order.amount) }}</td>
          <td>{{ order.terminal }}</td>
          <td>
              <span class="badge" :class="order.status.toLowerCase()">
                {{ order.status }}
              </span>
          </td>
          <td class="text-end">
            <Button
                label="Approve"
                icon="pi pi-check-circle"
                class="approve-btn"
                :disabled="!order.approvable"
                @click="$emit('approve', order)"
            />
          </td>
        </tr>

        <!-- Fila expandida -->
        <tr v-if="isExpanded(order.id)">
          <td colspan="7">
            <ConciliationRow
                :products="order.products"
                @approve="$emit('approve', order)"
            />
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import ConciliationRow from './ConciliationRow.vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['approve'])

const expandedRows = ref([])

function toggleExpanded(id) {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter(i => i !== id)
  } else {
    expandedRows.value.push(id)
  }
}

function isExpanded(id) {
  return expandedRows.value.includes(id)
}

function formatCurrency(value) {
  const val = parseFloat(value)
  if (isNaN(val)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(val).replace('PEN', 'S/')
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.conciliation-table {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  background-color: #152238;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #1e2e4a;
}

th,
td {
  padding: 1rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #1f2d44;
  text-align: left;
  vertical-align: middle;
}

th.text-end,
td.text-end {
  text-align: right;
}

.icon-cell {
  width: 40px;
  text-align: center;
}

/* Expand button */
:deep(.expand-btn.p-button) {
  background: none;
  color: #94a3b8;
  font-size: 1.2rem;
  border: none;
  padding: 0.25rem;
}

:deep(.expand-btn.rotated i) {
  transform: rotate(180deg);
}

/* Badge estilo custom */
.badge {
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
}

.badge.requested {
  background-color: #00ffff22;
  color: #00ffff;
}

.badge.approved {
  background-color: #22c55e22;
  color: #22c55e;
}

/* Botón approve */
:deep(.approve-btn.p-button) {
  background-color: #22c55e;
  color: white;
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 8px;
  gap: 0.4rem;
}

:deep(.approve-btn.p-button:disabled),
:deep(.approve-btn.p-button.p-disabled) {
  background-color: #64748b;
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
