<template>
  <section class="clients-dashboard">
    <header class="header">
      <h1>Clients Overview</h1>
      <p class="subtitle">Summary of clients who have placed orders with your company</p>
    </header>

    <ClientList :orders="releasedOrders" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClientList from '../components/ClientList.vue'
import { getReleasedOrders } from '@/domains/supplier/analytics/services/analyticsService'

const releasedOrders = ref([])

onMounted(async () => {
  releasedOrders.value = await getReleasedOrders()
})
</script>

<style scoped>
.clients-dashboard {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}

.header h1 {
  font-size: 1.6rem;
  font-weight: 600;
}

.subtitle {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
}
</style>
