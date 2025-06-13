<template>
  <div class="transport-selector">
    <div class="selector-row">
      <Dropdown
          v-model="selectedTruckId"
          :options="trucks"
          optionLabel="label"
          optionValue="id"
          placeholder="Select truck"
          class="dropdown-dark"
          showClear
      />

      <InputText
          :value="selectedTruck?.driver || ''"
          placeholder="Select driver"
          readonly
          class="input-dark"
          :disabled="!selectedTruck"
      />

      <InputText
          :value="selectedTruck ? `${selectedTruck.quantity} gal` : ''"
          placeholder="Select tank"
          readonly
          class="input-dark"
          :disabled="!selectedTruck"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'

const props = defineProps({
  trucks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:transport'])

const selectedTruckId = ref(null)

const selectedTruck = computed(() =>
    props.trucks.find(t => t.id === selectedTruckId.value)
)

const trucks = computed(() =>
    props.trucks.map(t => ({
      ...t,
      label: `${t.plate} — ${t.driver}`
    }))
)

watch(selectedTruck, (truck) => {
  if (truck) {
    emit('update:transport', {
      id: truck.id,
      plate: truck.plate,
      driver: truck.driver,
      quantity: truck.quantity,
      fuel: truck.fuel
    })
  } else {
    emit('update:transport', null)
  }
})
</script>

<style scoped>
.transport-selector {
  width: 100%;
}

.selector-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.dropdown-dark .p-dropdown) {
  background-color: #1e2e4a;
  border: 1px solid #334155;
  color: #ffffff;
  font-size: 0.85rem;
}

:deep(.dropdown-dark .p-dropdown-label) {
  color: #ffffff;
}

.input-dark {
  flex: 1;
  background-color: #1e2e4a;
  border: 1px solid #334155;
  color: #ffffff;
  font-size: 0.85rem;
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
}

.input-dark[readonly] {
  background-color: #1e2e4a;
  cursor: not-allowed;
  color: #cbd5e1;
}

.input-dark:disabled {
  opacity: 0.5;
}
</style>
