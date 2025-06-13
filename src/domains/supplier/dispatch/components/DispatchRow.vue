<template>
  <tr class="dispatch-row">
    <!-- Checkbox con PrimeVue -->
    <td>
      <Checkbox v-model="isChecked" :binary="true" @change="emitSelection" />
    </td>

    <!-- Fecha formateada -->
    <td>{{ formattedDate }}</td>

    <!-- Cliente -->
    <td>{{ order.user }}</td>

    <!-- Monto total -->
    <td>{{ order.amount }}</td>

    <!-- Terminal -->
    <td>{{ order.terminal }}</td>

    <!-- Estado -->
    <td>
      <PhCheckCircle
          v-if="order.approved"
          :size="20"
          weight="bold"
          class="icon-check"
      />
    </td>

    <!-- Botón Gear -->
    <td>
      <Button
          icon="pi pi-cog"
          class="p-button-text p-button-sm text-white"
          @click="openModal(order.products[0])"
      />
    </td>

    <!-- Modal con PrimeVue Dialog -->
    <Dialog v-model:visible="showModal" modal header="Assign Cargo" :style="{ width: '50vw' }">
      <AssignCargoModal
          :product="selectedProduct"
          :order-id="order.id"
          :trucks="trucks"
          :drivers="drivers"
          :tanks="tanks"
          @close="showModal = false"
      />
    </Dialog>
  </tr>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PhCheckCircle } from '@phosphor-icons/vue'
import AssignCargoModal from './AssignCargoModal.vue'
import { getTrucks, getDrivers, getTanks } from '../services/dispatchService'

// PrimeVue
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps({
  order: Object
})

const emit = defineEmits(['select'])

const isChecked = ref(false)
const showModal = ref(false)
const selectedProduct = ref(null)

const trucks = ref([])
const drivers = ref([])
const tanks = ref([])

function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}

function emitSelection() {
  emit('select', { id: props.order.id, selected: isChecked.value })
}

const formattedDate = computed(() => {
  const date = new Date(props.order.created)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase()
})

onMounted(async () => {
  trucks.value = await getTrucks()
  drivers.value = await getDrivers()
  tanks.value = await getTanks()
})
</script>

<style scoped>
.dispatch-row {
  background-color: #0c1c2f;
}

.dispatch-row:hover {
  background-color: #142b45;
}

td {
  padding: 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #1f2d44;
  color: #e2e8f0;
}

.icon-check {
  color: #22c55e;
}

:deep(.p-dialog) {
  background-color: #1e2e4a;
  color: white;
}
</style>
