<template>
  <div class="pagination-bar">
    <!-- Items per page -->
    <div class="items-per-page">
      <span>Items per page:</span>
      <Dropdown
          v-model="selectedPerPage"
          :options="perPageOptions"
          @change="changeItemsPerPage"
          class="dropdown-custom"
      />
    </div>

    <!-- Rango de ítems -->
    <div class="range-info">
      {{ startItem }} - {{ endItem }} of {{ total }} items
    </div>

    <!-- Navegación -->
    <div class="page-navigation">
      <Dropdown
          v-model="formattedPage"
          :options="formattedPages"
          @change="emitPageChange(formattedPage)"
          class="dropdown-custom"
      />
      <span>of {{ formatPage(totalPages) }} pages</span>

      <Button icon="pi pi-chevron-left" rounded text @click="changePage(page - 1)" :disabled="page <= 1" />
      <Button icon="pi pi-chevron-right" rounded text @click="changePage(page + 1)" :disabled="page >= totalPages" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps({
  page: Number,
  total: Number,
  itemsPerPage: Number
})
const emit = defineEmits(['changePage', 'update:itemsPerPage'])

const perPageOptions = [5, 10, 13, 15, 25]
const selectedPerPage = ref(props.itemsPerPage)
const formattedPage = ref(formatPage(props.page))

const totalPages = computed(() => Math.max(Math.ceil(props.total / props.itemsPerPage), 1))
const formattedPages = computed(() =>
    Array.from({ length: totalPages.value }, (_, i) => formatPage(i + 1))
)

const startItem = computed(() =>
    props.total === 0 ? 0 : (props.page - 1) * props.itemsPerPage + 1
)
const endItem = computed(() => Math.min(props.page * props.itemsPerPage, props.total))

watch(() => props.itemsPerPage, val => selectedPerPage.value = val)
watch(() => props.page, val => formattedPage.value = formatPage(val))

function formatPage(page) {
  return String(page).padStart(2, '0')
}

function parsePage(str) {
  return parseInt(str, 10)
}

function emitPageChange(formattedStr) {
  emit('changePage', parsePage(formattedStr))
}

function changePage(newPage) {
  emit('changePage', newPage)
}

function changeItemsPerPage() {
  emit('update:itemsPerPage', Number(selectedPerPage.value))
}
</script>

<style scoped>
/* Estilo del overlay desplegable */
:deep(.p-dropdown-panel) {
  background-color: #0c1f3a;
  color: #ffffff;
  border: 1px solid #2c3e60;
}

/* Hover sobre cada ítem */
:deep(.p-dropdown-item.p-highlight),
:deep(.p-dropdown-item:hover) {
  background-color: #2c3e60 !important;
  color: #ffffff;
}

/* Opcional: para mejorar el separador entre ítems */
:deep(.p-dropdown-items) {
  border-top: 1px solid #2c3e60;
}

.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e2e4a;
  padding: 1rem;
  border-radius: 10px;
  color: #cbd5e1;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}

.items-per-page,
.range-info,
.page-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Dropdown PrimeVue estilizado con tu paleta */
:deep(.dropdown-custom .p-dropdown) {
  background-color: #0c1f3a;
  border: 1px solid #2c3e60;
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
}

:deep(.p-dropdown-label) {
  color: #408ecf;
}

/* Botones de navegación */
:deep(.p-button) {
  color: #cbd5e1;
  background-color: #243955;
  border: none;
  font-size: 1rem;
  padding: 0.4rem 0.7rem;
  transition: background-color 0.2s ease;
}

:deep(.p-button:hover:not(.p-disabled)) {
  background-color: #2c3e60;
}

:deep(.p-button:disabled),
:deep(.p-button.p-disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
