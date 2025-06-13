<template>
  <section class="provider-analytics">
    <!-- Encabezado -->
    <header class="header">
      <h1>Provider Analytics</h1>
      <p class="subtitle">Statistics and performance overview</p>
    </header>

    <!-- Tarjetas resumen -->
    <div class="stats-cards">
      <AnalyticsSummaryCard title="Total Orders" :value="totalOrders" />
      <AnalyticsSummaryCard title="Total Volume (gal)" :value="totalVolume" />
      <AnalyticsSummaryCard title="Clients Served" :value="totalClients" />
    </div>

    <!-- Gráficos -->
    <div class="charts">
      <BarChartFuel :orders="orders" />
      <TopClients :orders="orders" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getReleasedOrders } from '../services/analyticsService'

import AnalyticsSummaryCard from '../components/AnalyticsSummaryCard.vue'
import BarChartFuel from '../components/BarChartFuel.vue'
import TopClients from '../components/TopClients.vue'

const orders = ref([])

onMounted(async () => {
  orders.value = await getReleasedOrders()
})

const totalOrders = computed(() => orders.value.length)

const totalVolume = computed(() =>
    orders.value.reduce((sum, order) =>
        sum + order.products.reduce((acc, p) => acc + Number(p.quantity), 0), 0)
)

const totalClients = computed(() => {
  const unique = new Set(orders.value.map(o => o.user))
  return unique.size
})
</script>

<style scoped>
.provider-analytics {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}

.header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #ffffff;
}

.subtitle {
  font-size: 0.95rem;
  color: #a0aec0;
  margin-bottom: 2rem;
}

.stats-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}
</style>
