<template>
  <header class="conciliations-header">
    <!-- Título y breadcrumb -->
    <div class="top-row">
      <div class="left-block">
        <h1 class="title">Conciliations</h1>
        <p class="subtitle">Check your order's payments and approve them!</p>
      </div>

      <div class="breadcrumb">
        <span>Home</span> / <strong>Conciliations</strong>
      </div>
    </div>

    <!-- Acciones y métricas -->
    <div class="middle-row">
      <!-- Acciones -->
      <div class="buttons">
        <Button
            icon="pi pi-upload"
            label="Load Bank Statement"
            class="load-btn"
            @click="$emit('open-load')"
        />
        <Button
            icon="pi pi-trash"
            label="Clear Document"
            class="clear-btn"
            @click="$emit('clear')"
        />
      </div>

      <!-- KPI Visuales -->
      <div class="kpi-container">
        <div class="kpi">
          <span class="value">{{ formatNumber(totalOrders) }}</span>
          <span class="label">Total Orders</span>
        </div>
        <div class="divider"></div>
        <div class="kpi">
          <span class="value approved">{{ formatNumber(totalApproved) }}</span>
          <span class="label">Approved</span>
        </div>
        <div class="divider"></div>
        <div class="kpi">
          <span class="value requested">{{ formatNumber(totalRequested) }}</span>
          <span class="label">Requested</span>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bottom-row">
      <div class="filters">
        <Button
            icon="pi pi-sliders-h"
            label="Filters"
            class="filter-btn"
            @click="$emit('filter')"
        />
        <Button
            icon="pi pi-calendar"
            label="Date Range"
            class="filter-btn"
            @click="$emit('range')"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import Button from 'primevue/button'

const props = defineProps({
  totalOrders: Number,
  totalApproved: Number,
  totalRequested: Number
})

function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M'
  if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
  return value
}
</script>

<style scoped>
.conciliations-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 0.5rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-top: 0.3rem;
}

.breadcrumb {
  font-size: 0.8rem;
  color: #94a3b8;
}

.middle-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

/* Botones personalizados PrimeVue */
:deep(.load-btn.p-button) {
  background-color: #f97316;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

:deep(.clear-btn.p-button) {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

:deep(.load-btn.p-button:hover),
:deep(.clear-btn.p-button:hover) {
  opacity: 0.85;
  transform: translateY(-1px);
}

.kpi-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

.value.approved {
  color: #22c55e;
}

.value.requested {
  color: #00ffff;
}

.label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.divider {
  width: 1px;
  height: 2.2rem;
  background-color: #334155;
  opacity: 0.6;
}

.bottom-row {
  display: flex;
  justify-content: flex-end;
}

.filters {
  display: flex;
  gap: 0.8rem;
}

:deep(.filter-btn.p-button) {
  background-color: #1e2e4a;
  color: #cbd5e1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  gap: 0.4rem;
}

:deep(.filter-btn.p-button:hover) {
  background-color: #324260;
}
</style>
