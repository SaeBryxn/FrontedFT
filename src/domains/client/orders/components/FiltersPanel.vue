<template>
  <div class="filters-panel">
    <!-- Totals Section -->
    <div class="totals">
      <div class="item">
        <strong>{{ totalOrders }}</strong>
        <span>{{ t('orders.filters.total') }}</span>
      </div>
      <div class="divider" />
      <div class="item">
        <Tag :value="`${approved} ${t('orders.filters.approved')}`" severity="warning" />
      </div>
      <div class="item">
        <Tag :value="`${requested} ${t('orders.filters.requested')}`" severity="success" />
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="actions">
      <Menu ref="menu" :model="menuItems" popup />
      <Button
          :label="t('orders.filters.filters')"
          icon="pi pi-filter"
          @click="toggleDropdown"
          outlined
      />

      <div class="active-chips" v-if="hasActiveFilters">
        <Chip
            v-if="status"
            :label="status"
            icon="pi pi-tag"
            removable
            @remove="clearFilter('status')"
        />
        <Chip
            v-if="startDate"
            :label="`${t('orders.filters.from')} ${startDate}`"
            icon="pi pi-calendar"
            removable
            @remove="clearFilter('start')"
        />
        <Chip
            v-if="endDate"
            :label="`${t('orders.filters.to')} ${endDate}`"
            icon="pi pi-calendar"
            removable
            @remove="clearFilter('end')"
        />
      </div>
    </div>

    <!-- Dropdown Filters -->
    <OverlayPanel ref="panel">
      <div class="p-fluid">
        <label for="state">{{ t('orders.filters.state') }}</label>
        <Dropdown
            v-model="status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            :placeholder="t('orders.filters.all')"
        />

        <label class="mt-3">{{ t('orders.filters.from') }}</label>
        <Calendar v-model="startDate" dateFormat="yy-mm-dd" showIcon />

        <label class="mt-3">{{ t('orders.filters.to') }}</label>
        <Calendar v-model="endDate" dateFormat="yy-mm-dd" showIcon />

        <Button
            :label="t('orders.filters.apply')"
            icon="pi pi-check-circle"
            class="mt-4"
            @click="applyFilters"
        />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getOrders } from '@/domains/client/orders/services/orderService.js'
import type { Order } from '@/domains/client/orders/models/Order'

import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Menu from 'primevue/menu'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Chip from 'primevue/chip'
import OverlayPanel from 'primevue/overlaypanel'

const { t } = useI18n()

const orders = ref<Order[]>([])
const status = ref('')
const startDate = ref('')
const endDate = ref('')
const panel = ref()

onMounted(async () => {
  orders.value = await getOrders()
})

const emit = defineEmits<{
  (e: 'filter', payload: { status: string; startDate: string; endDate: string }): void
}>()

const totalOrders = computed(() => orders.value.length)
const approved = computed(() => orders.value.filter(o => o.status === 'Approved').length)
const requested = computed(() => orders.value.filter(o => o.status === 'Requested').length)

const hasActiveFilters = computed(() => status.value || startDate.value || endDate.value)

const statusOptions = [
  { label: 'Requested', value: 'Requested' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Released', value: 'Released' },
  { label: 'Closed', value: 'Closed' }
]

function toggleDropdown(event: Event) {
  panel.value.toggle(event)
}

function applyFilters() {
  emit('filter', {
    status: status.value,
    startDate: startDate.value,
    endDate: endDate.value
  })
  panel.value.hide()
}

function clearFilter(type: 'status' | 'start' | 'end') {
  if (type === 'status') status.value = ''
  if (type === 'start') startDate.value = ''
  if (type === 'end') endDate.value = ''
  applyFilters()
}
</script>

<style scoped>
.filters-panel {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.totals {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #334155;
  align-items: center;
  text-align: center;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e2e8f0;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}
</style>
