<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-box">
      <!-- Header -->
      <div class="modal-header">
        <h2>Cargo</h2>
        <Button icon="pi pi-times" text rounded @click="close" class="close-btn" />
      </div>

      <!-- Selector -->
      <div class="section">
        <h3>Transport Information</h3>
        <div class="selector-row">
          <Dropdown
              v-model="selectedTruck"
              :options="filteredTrucks"
              optionLabel="plate"
              placeholder="Select truck"
              class="dropdown"
          />
          <Dropdown
              v-model="selectedDriver"
              :options="drivers"
              optionLabel="name"
              placeholder="Select driver"
              class="dropdown"
              :disabled="!selectedTruck"
          />
          <Dropdown
              v-model="selectedTank"
              :options="tanks"
              optionLabel="code"
              placeholder="Select tank"
              class="dropdown"
              :disabled="!selectedTruck"
          />
          <Button label="Validate" icon="pi pi-check" @click="validateTransport" class="validate-btn" />
        </div>
        <p v-if="showValidationMessage" class="validation-msg">
          Please fill all transport fields.
        </p>
      </div>

      <!-- Tabla de producto -->
      <DataTable
          :value="products"
          class="product-table"
          :pt="{
            table: { style: 'background-color: #1e2e4a; color: #ffffff' },
            headerRow: { style: 'background-color: #1a2f45; color: #cbd5e1' },
            bodyRow: { style: 'background-color: #1e2e4a; color: #ffffff; border-bottom: 1px solid #2c445f' }
          }"
      >
        <Column field="product" header="Product" />
        <Column field="quantity" header="Quantity" />
        <Column field="unit" header="Unit" />
        <Column header="Price" :body="p => formatCurrency(p.price)" />
        <Column header="Total" :body="p => formatCurrency(p.total)" />
        <Column header="Compartment">
          <template #body="{ index }">
            <Dropdown
                v-model="compartmentSelected[index]"
                :options="compartments"
                placeholder="Select"
                class="dropdown"
                :disabled="!isTransportValid"
            />
          </template>
        </Column>
      </DataTable>

      <!-- Footer -->
      <div class="modal-footer">
        <Button label="Save" icon="pi pi-save" :disabled="!isTransportValid" @click="saveAssignment" class="save-btn" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { assignTransportToOrder } from '../services/dispatchService'

const props = defineProps({
  product: Object,
  trucks: Array,
  drivers: Array,
  tanks: Array,
  orderId: Number
})
const emit = defineEmits(['close'])

const selectedTruck = ref(null)
const selectedDriver = ref(null)
const selectedTank = ref(null)
const isTransportValid = ref(false)
const showValidationMessage = ref(false)
const products = ref([props.product])
const compartments = ['Compartment 1', 'Compartment 2', 'Compartment 3']
const compartmentSelected = ref({ 0: null }) // para 1 producto

const filteredTrucks = computed(() =>
    props.trucks.filter(t => t.fuel === props.product.product)
)

function validateTransport() {
  const isValid = selectedTruck.value && selectedDriver.value && selectedTank.value
  isTransportValid.value = isValid
  showValidationMessage.value = !isValid
}

function formatCurrency(value) {
  const num = parseFloat(typeof value === 'string' ? value.replace('S/', '').trim() : value)
  return isNaN(num)
      ? 'S/ 0.00'
      : new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(num).replace('PEN', 'S/')
}

function close() {
  emit('close')
}

async function saveAssignment() {
  if (!isTransportValid.value) return
  const payload = {
    truck: selectedTruck.value,
    driver: selectedDriver.value,
    tank: selectedTank.value,
    compartment: compartmentSelected.value[0] || null
  }
  try {
    await assignTransportToOrder(props.orderId, payload)
    window.alert('✅ Order released successfully!')
    emit('close')
  } catch (error) {
    const msg = error.response?.data || error.message
    window.alert(`❌ Error: ${msg}`)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 31, 58, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-box {
  background-color: #1e2e4a;
  border-radius: 16px;
  padding: 2rem;
  width: 92%;
  max-width: 860px;
  color: #ffffff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}
.dropdown {
  min-width: 150px;
  flex: 1;
}
.selector-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.validate-btn {
  background-color: #22c55e;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
}
.validation-msg {
  color: #f87171;
  background: #7f1d1d33;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}
.save-btn {
  background-color: #22c55e;
  color: white;
  padding: 0.65rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
}
.save-btn:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}
</style>
