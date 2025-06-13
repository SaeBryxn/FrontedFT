<template>
  <div class="dispatch-header">
    <!-- Sección izquierda -->
    <div class="left">
      <h2 class="text-2xl font-bold text-white mb-1">Dispatch</h2>
      <p class="text-sm text-slate-300 mb-2">
        Check your order’s payments and approve them!
      </p>

      <Button
          label="Release Orders"
          icon="pi pi-check"
          severity="warning"
          :disabled="!hasSelected"
          @click="$emit('release')"
          class="w-max"
      />
    </div>

    <!-- Sección derecha -->
    <div class="right">
      <div class="stats flex gap-4 items-center mb-2">
        <div class="flex flex-col items-center">
          <span class="text-green-400 font-bold text-lg">651.9K</span>
          <span class="text-sm text-slate-400">Total Orders</span>
        </div>
        <span class="text-slate-500 text-xl">|</span>
        <div class="flex flex-col items-center">
          <span class="text-green-400 font-bold text-lg">607.78K</span>
          <span class="text-sm text-slate-400">Approved</span>
        </div>
        <span class="text-slate-500 text-xl">|</span>
        <div class="flex flex-col items-center">
          <span class="text-green-400 font-bold text-lg">44.12K</span>
          <span class="text-sm text-slate-400">Requested</span>
        </div>
      </div>

      <div class="flex gap-2">
        <Button
            icon="pi pi-sliders-h"
            label="Filters"
            outlined
            severity="secondary"
            class="dark-button"
        />
        <Button
            icon="pi pi-calendar"
            label="Date Range"
            outlined
            severity="secondary"
            class="dark-button"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import  Button  from 'primevue/button'

defineProps({
  hasSelected: Boolean
})
defineEmits(['release'])
</script>

<style scoped>
.dispatch-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  padding: 1.5rem 0;
}

.left {
  flex: 1;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.dark-button {
  background-color: #1e2e4a !important;
  border-color: #334155 !important;
  color: #cbd5e1 !important;
}
</style>
