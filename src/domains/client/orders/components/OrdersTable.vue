<template>
  <div class="card orders-table-wrapper">
    <DataTable
        v-model:expandedRows="expandedRows"
        :value="orders"
        dataKey="id"
        @rowExpand="onRowExpand"
        @rowCollapse="onRowCollapse"
        tableStyle="min-width: 60rem"
    >
      <!-- Cabecera con botones Expand/Collapse All -->
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
          <Button text="Collapse All" icon="pi pi-minus" @click="collapseAll" />
        </div>
      </template>

      <Column expander style="width: 3rem" />

      <Column field="created" :header="$t('orders.table.created')">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.created) }}
        </template>
      </Column>

      <Column field="user" :header="$t('orders.table.user')" />
      <Column field="amount" :header="$t('orders.table.amount')" />
      <Column field="terminal" :header="$t('orders.table.terminal')" />

      <Column field="orderId" :header="$t('orders.table.order_id')">
        <template #body="slotProps">
          <span class="order-id">
            {{ slotProps.data.orderId }}
            <i
                class="pi pi-copy"
                title="Copiar"
                @click.stop="copyToClipboard(slotProps.data.orderId)"
            ></i>
          </span>
        </template>
      </Column>

      <Column field="status" :header="$t('orders.table.status')">
        <template #body="slotProps">
          <Tag
              :value="slotProps.data.status"
              :severity="getStatusSeverity(slotProps.data.status)"
          />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="p-4">
          <OrderDetails :products="slotProps.data.products" />
        </div>
      </template>
    </DataTable>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import OrderDetails from './OrderDetails.vue'
import type { Order } from '@/domains/client/orders/models/Order'

const props = defineProps<{
  orders: Order[]
}>()

const expandedRows = ref<{ [key: string]: boolean }>({})
const toast = useToast()

function onRowExpand(event: any) {
  expandedRows.value[event.data.id] = true
  toast.add({ severity: 'info', summary: 'Order Expanded', detail: event.data.orderId, life: 2000 })
}

function onRowCollapse(event: any) {
  delete expandedRows.value[event.data.id]
  toast.add({ severity: 'warn', summary: 'Order Collapsed', detail: event.data.orderId, life: 2000 })
}

function expandAll() {
  expandedRows.value = props.orders.reduce((acc, order) => {
    acc[order.id] = true
    return acc
  }, {} as { [key: string]: boolean })
}

function collapseAll() {
  expandedRows.value = {}
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase()
}

function getStatusSeverity(status: string): string {
  switch (status.toLowerCase()) {
    case 'requested':
      return 'success'
    case 'approved':
      return 'warning'
    case 'released':
      return 'info'
    case 'closed':
      return 'danger'
    default:
      return 'secondary'
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>
.orders-table-wrapper {
  background-color: var(--surface-card);
  border-radius: 12px;
  padding: 1rem;
  transition: background-color 0.3s ease;
}

.order-id {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  color: var(--primary-color);
}

.order-id i {
  font-size: 1rem;
  color: var(--primary-color);
  transition: color 0.2s;
}

.order-id:hover i {
  color: var(--primary-dark-color);
}
</style>
