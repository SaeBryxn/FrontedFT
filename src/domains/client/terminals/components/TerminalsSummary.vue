<template>
  <div class="cards-grid">
    <div
        v-if="enrichedTerminals.length"
        v-for="terminal in enrichedTerminals"
        :key="terminal.name"
        class="terminal-card"
    >
      <Card class="shadow-2 border-round-xl surface-card px-4 py-3">
        <template #content>
          <div class="flex flex-column md:flex-row justify-between align-items-center gap-4">
            <div class="flex items-center gap-3 min-w-12rem">
              <Avatar icon="pi pi-building" class="bg-primary-100 text-primary" shape="circle" size="large" />
              <span class="text-lg font-semibold text-color">{{ terminal.name }}</span>
            </div>
            <div class="flex flex-wrap md:flex-nowrap justify-around flex-1 gap-4">
              <div class="text-center">
                <span class="text-sm text-color-secondary block">Órdenes: </span>
                <span class="text-base font-medium text-color">{{ terminal.totalOrders }}</span>
              </div>
              <div class="text-center">
                <span class="text-sm text-color-secondary block">Galones: </span>
                <span class="text-base font-medium text-color">{{ formatGallons(terminal.totalGallons) }}</span>
              </div>
              <div class="text-center">
                <span class="text-sm text-color-secondary block">Estado común </span>
                <Tag
                    :value="terminal.topStatus"
                    :severity="statusSeverity(terminal.topStatus)"
                    rounded
                    class="text-xs mt-1 px-3 py-1"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else>
      <Message severity="warn" class="w-full justify-content-center">
        <i class="pi pi-exclamation-triangle mr-2" />
        No hay terminales registradas aún.
      </Message>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Message from 'primevue/message'
import Avatar from 'primevue/avatar'

import { getOrders } from '../services/terminalService.js'

const orders = ref([])

onMounted(async () => {
  orders.value = await getOrders()
})

const enrichedTerminals = computed(() => {
  const terminalMap = {}

  for (const order of orders.value) {
    const name = order.terminal?.trim()
    if (!name) continue

    if (!terminalMap[name]) {
      terminalMap[name] = {
        name,
        totalOrders: 0,
        totalGallons: 0,
        statusCount: {}
      }
    }

    const t = terminalMap[name]
    t.totalOrders++
    t.totalGallons += order.products.reduce((sum, p) => sum + p.quantity, 0)
    t.statusCount[order.status] = (t.statusCount[order.status] || 0) + 1
  }

  return Object.values(terminalMap).map(t => {
    const topStatus = Object.entries(t.statusCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    return {
      name: t.name,
      totalOrders: t.totalOrders,
      totalGallons: t.totalGallons,
      topStatus
    }
  })
})

function statusSeverity(status) {
  return {
    Requested: 'info',
    Approved: 'warning',
    Released: 'success',
    Closed: 'secondary'
  }[status] || 'help'
}

function formatGallons(value) {
  return new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(value) + ' gal'
}
</script>

<style scoped>
.p-card {
  transition: transform 0.2s ease;
}
.p-card:hover {
  transform: translateY(-3px);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding-block: 1rem;
}

.terminal-card {
  transition: transform 0.2s ease;
}

.terminal-card:hover {
  transform: translateY(-3px);
}

@media (max-width: 600px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

</style>
