<template>
  <Card class="top-clients-card">
    <template #title>
      <span class="chart-title">Top Clients</span>
    </template>

    <template #content>
      <ul class="client-list">
        <li v-for="(client, index) in topClients" :key="index" class="client-item">
          <div class="client-info">
            <span class="rank">#{{ index + 1 }}</span>
            <span class="name">{{ client.name }}</span>
          </div>
          <span class="volume">{{ client.volume.toLocaleString() }} gal</span>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import { computed } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

// Agrupar volumen por cliente
const topClients = computed(() => {
  const map = {}

  props.orders.forEach(order => {
    const user = order.user
    const volume = order.products.reduce((sum, p) => sum + Number(p.quantity), 0)
    map[user] = (map[user] || 0) + volume
  })

  return Object.entries(map)
      .map(([name, volume]) => ({ name, volume }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5)
})
</script>

<style scoped>
.top-clients-card {
  flex: 1;
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.client-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 0.5rem;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #334155;
  color: #e2e8f0;
}

.client-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.rank {
  font-weight: bold;
  color: #22c55e;
}

.name {
  font-weight: 500;
  font-size: 0.95rem;
}

.volume {
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
