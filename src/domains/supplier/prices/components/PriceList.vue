<template>
  <Card class="price-list-card">
    <template #title>
      <span class="text-white text-lg font-medium">Fuel Prices</span>
    </template>

    <template #content>
      <div class="table-wrapper">
        <table class="price-table">
          <thead>
          <tr>
            <th>Fuel Type</th>
            <th>Current Price</th>
            <th>New Price</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="fuel in editableFuels" :key="fuel.id">
            <td>{{ fuel.type }}</td>
            <td>{{ formatCurrency(fuel.pricePerGal) }}</td>
            <td>
              <InputNumber
                  v-model="fuel.newPrice"
                  :min="0"
                  :step="0.01"
                  mode="currency"
                  currency="PEN"
                  locale="es-PE"
                  class="input-price"
              />
            </td>
            <td>
              <Button
                  label="Save"
                  icon="pi pi-check"
                  :disabled="!isPriceValid(fuel)"
                  @click="updatePrice(fuel)"
                  class="p-button-sm p-button-success"
                  rounded
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, watch } from 'vue'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const props = defineProps({
  fuels: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update'])

const editableFuels = ref([])

// Sincronizar y limpiar precio
watch(
    () => props.fuels,
    (newFuels) => {
      editableFuels.value = newFuels.map(f => ({
        ...f,
        pricePerGal: parseFloat(String(f.pricePerGal).replace(/[^\d.-]+/g, '')),
        newPrice: null
      }))
    },
    { immediate: true }
)

function isPriceValid(fuel) {
  const val = parseFloat(fuel.newPrice)
  return !isNaN(val) && val > 0
}

function updatePrice(fuel) {
  emit('update', { id: fuel.id, newPrice: fuel.newPrice })
  fuel.newPrice = null
}

function formatCurrency(value) {
  const num = typeof value === 'string'
      ? parseFloat(value.replace(/[^\d.-]+/g, ''))
      : value

  return isNaN(num)
      ? '—'
      : new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(num)
}
</script>

<style scoped>
.price-list-card {
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1rem 1.5rem 2rem;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.table-wrapper {
  overflow-x: auto;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th {
  background-color: #1e3955;
  color: #cbd5e1;
  padding: 0.8rem;
  text-align: left;
  font-size: 0.9rem;
  white-space: nowrap;
}

td {
  padding: 0.8rem;
  border-bottom: 1px solid #2c445f;
  font-size: 0.85rem;
  color: #e2e8f0;
  white-space: nowrap;
}

.input-price {
  width: 130px;
}

.p-button-success {
  background-color: #22c55e;
  border: none;
}
</style>
