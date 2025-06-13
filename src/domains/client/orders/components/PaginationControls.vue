<template>
  <div class="pagination-container">
    <div class="left">
      <label for="limit">
        {{ $t('pagination.items_per_page') }}:
      </label>
      <Dropdown
          inputId="limit"
          :options="limits"
          v-model="limit"
          @change="changeLimit"
          optionLabel="label"
          optionValue="value"
          class="w-10rem"
      />
    </div>

    <div class="center">
      {{ startItem }} – {{ endItem }} {{ $t('pagination.of') }} {{ totalItems }} {{ $t('pagination.items') }}
    </div>

    <div class="right">
      <Button icon="pi pi-angle-double-left" :disabled="currentPage === 1" @click="emit('change', 1)" text />
      <Button icon="pi pi-angle-left" :disabled="currentPage === 1" @click="emit('change', currentPage - 1)" text />
      <span class="page">{{ currentPage }}</span>
      <Button icon="pi pi-angle-right" :disabled="currentPage === totalPages" @click="emit('change', currentPage + 1)" text />
      <Button icon="pi pi-angle-double-right" :disabled="currentPage === totalPages" @click="emit('change', totalPages)" text />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  totalItems: Number,
  itemsPerPage: Number
})

const emit = defineEmits(['change', 'limitChange'])

const limit = ref(props.itemsPerPage)

const limits = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '13', value: 13 },
  { label: '25', value: 25 }
]

const startItem = computed(() => {
  return (props.currentPage - 1) * limit.value + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * limit.value, props.totalItems)
})

function changeLimit() {
  emit('limitChange', limit.value)
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 13.5px;
  color: #475569;
  background-color: #f9fafb;
  border-top: 1px solid #e2e8f0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  flex-wrap: wrap;
  gap: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.left, .center, .right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.center {
  font-weight: 500;
  color: #334155;
}

.page {
  font-weight: 600;
  color: #1e293b;
  padding: 0 0.5rem;
}
</style>
