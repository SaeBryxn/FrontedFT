<template>
  <div class="providers-stats">
    <div class="stat-card">
      <h3>Total Proveedores</h3>
      <p>{{ totalProviders }}</p>
    </div>
    <div class="stat-card">
      <h3>Promedio de Órdenes</h3>
      <p>{{ avgOrders }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProviders, getOrders } from '../services/providerService.js'

const totalProviders = ref(0)
const avgOrders = ref(0)

onMounted(async () => {
  const providers = await getProviders()
  const orders = await getOrders()

  totalProviders.value = providers.length
  avgOrders.value = providers.length ? (orders.length / providers.length).toFixed(1) : '0.0'
})
</script>

<style scoped>
.providers-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.stat-card h3 {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}
.stat-card p {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}
</style>
