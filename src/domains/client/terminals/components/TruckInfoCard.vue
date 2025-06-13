<template>
  <Card class="truck-card">
    <template #title>
      <div class="flex align-items-center gap-2">
        <i class="ph ph-truck text-primary text-xl"></i>
        <span class="font-bold text-lg text-surface-900">{{ truck.plate }}</span>
      </div>
    </template>

    <template #content>
      <ul class="p-0 m-0 list-none flex flex-column gap-3 text-sm text-surface-700">
        <li class="flex align-items-center gap-2">
          <i class="ph ph-user text-primary"></i>
          <span>Conductor: <strong>{{ truck.driver }}</strong></span>
        </li>
        <li class="flex align-items-center gap-2">
          <i class="ph ph-map-pin text-primary"></i>
          <span>Origen: <strong>{{ truck.origin }}</strong></span>
        </li>
        <li class="flex align-items-center gap-2">
          <i class="ph ph-gas-pump text-primary"></i>
          <span>{{ truck.fuel }} – {{ truck.quantity }} gal</span>
        </li>
        <li class="flex align-items-center gap-2">
          <i class="ph ph-clock text-primary"></i>
          <span>Estado: <strong>{{ truck.status }}</strong></span>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'

defineProps({
  truck: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.truck-card {
  background: var(--surface-card);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-2);
  padding: 1rem;
}
</style>
