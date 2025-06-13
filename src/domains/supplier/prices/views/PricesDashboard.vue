<template>
  <section class="prices-dashboard">
    <header class="header">
      <h1>Fuel Prices</h1>
      <p class="subtitle">Manage your fuel price list</p>
    </header>

    <PriceList :fuels="fuels" @update="handlePriceUpdate" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PriceList from '../components/PriceList.vue'
import { getProviderFuels, updateFuelPrice } from '../services/priceService'

const providerRuc = '10498765432' // Simulación temporal

const fuels = ref([])

onMounted(async () => {
  fuels.value = await getProviderFuels(providerRuc)
})

async function handlePriceUpdate({ id, newPrice }) {
  const updated = await updateFuelPrice(id, newPrice)
  if (updated) {
    const item = fuels.value.find(f => f.id === id)
    if (item) {
      item.pricePerGal = parseFloat(newPrice)
    }
  }
}
</script>

<style scoped>
.prices-dashboard {
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
