<template>
  <div class="workflow-dashboard">
    <h2 class="text-xl font-semibold text-primary mb-2">
      <i class="pi pi-sitemap mr-2" /> Flujos de Órdenes
    </h2>
    <p class="text-sm text-color-secondary mb-4">
      Seguimiento visual de tus órdenes paso a paso.
    </p>

    <div v-if="orders.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <OrderWorkflowCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
      />
    </div>

    <Message v-else severity="info">
      <i class="pi pi-info-circle mr-2" /> No hay órdenes disponibles para visualizar.
    </Message>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import OrderWorkflowCard from '../components/OrderWorkflowCard.vue'
import Message from 'primevue/message'
import { getWorkflows } from '../services/workflowService'

const orders = ref([])

onMounted(async () => {
  orders.value = await getWorkflows()
})
</script>

<style scoped>
.workflow-dashboard {
  padding: 2rem;
  background: var(--surface-ground);
}
</style>
