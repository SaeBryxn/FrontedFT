<template>
  <div class="filters-panel">
    <!-- Botón de filtros -->
    <Button
        class="filter-btn"
        @click="emit('applyFilters')"
        icon="pi pi-sliders-h"
        label="Filters"
        rounded
    />

    <!-- Botón de rango de fechas -->
    <Button
        class="filter-btn date"
        icon="pi pi-calendar"
        label="Date Range"
        rounded
    />
  </div>
</template>

<script setup>
import Button from 'primevue/button'
const emit = defineEmits(['applyFilters'])
</script>

<style scoped>
.filters-panel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Estilo para todos los botones PrimeVue con tu color base */
:deep(.filter-btn.p-button) {
  background-color: #1e2e4a;
  border: none;
  color: #cbd5e1;
  font-size: 0.85rem;
  padding: 0.5rem 1.1rem;
  transition: background-color 0.2s ease;
  font-weight: 500;
}

/* Hover */
:deep(.filter-btn.p-button:hover) {
  background-color: #243955;
}

/* Estilo personalizado para el botón de fecha */
:deep(.filter-btn.date.p-button) {
  background-color: #2e4c6f;
}
</style>
