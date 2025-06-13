<template>
  <div class="step-order-details">
    <h2 class="section-title">Información de la Orden</h2>

    <div class="form-grid">
      <div class="form-field">
        <label for="orderName">Nombre de la Orden</label>
        <InputText
            id="orderName"
            v-model="orderName"
            placeholder="Ej. Pedido Urgente Lima"
            :class="{ invalid: !orderName && submitted }"
            class="w-full"
        />
        <small v-if="!orderName && submitted" class="p-error">Este campo es obligatorio</small>
      </div>

      <div class="form-field">
        <label for="responsible">Responsable</label>
        <InputText
            id="responsible"
            v-model="responsible"
            placeholder="Nombre completo"
            :class="{ invalid: !responsible && submitted }"
            class="w-full"
        />
        <small v-if="!responsible && submitted" class="p-error">Este campo es obligatorio</small>
      </div>

      <div class="form-field full-width">
        <label for="terminal">Terminal de Despacho</label>
        <Dropdown
            id="terminal"
            v-model="terminal"
            :options="terminals"
            placeholder="Seleccione una terminal"
            :class="{ invalid: !terminal && submitted }"
            class="w-full"
        />
        <small v-if="!terminal && submitted" class="p-error">Este campo es obligatorio</small>
      </div>
    </div>

    <h3 class="detail-title">Detalles de la Orden</h3>

    <div class="details-wrapper">
      <div
          v-for="(detail, index) in details"
          :key="index"
          class="detail-row"
      >
        <div class="product-price-wrapper">
          <Dropdown
              v-model="detail.product"
              :options="fuels.map(f => f.type)"
              placeholder="Seleccione"
              :class="{ invalid: !detail.product && submitted }"
              class="detail-input"
          />
          <span v-if="detail.product" class="fuel-price">
            Precio actual: {{ getPricePerGal(detail.product) }}
          </span>
        </div>

        <InputNumber
            v-model="detail.quantity"
            :min="1"
            placeholder="0"
            :class="{ invalid: (!detail.quantity || detail.quantity <= 0) && submitted }"
            class="detail-input"
        />

        <InputText
            :value="detail.totalPrice"
            disabled
            class="detail-input disabled"
        />

        <InputText
            v-model="detail.note"
            placeholder="Opcional"
            class="detail-input"
        />

        <Button
            icon="pi pi-times"
            class="p-button-text p-button-danger"
            @click="removeDetail(index)"
        />
      </div>
    </div>

    <Button
        label="+ Añadir Detalle"
        class="p-button-sm p-button-info mt-3"
        @click="addDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import { getFuels } from '@/domains/client/orders/services/fuelService.js'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'invalid', 'valid'])

const submitted = ref(false)
const orderName = ref(props.modelValue.orderName || '')
const responsible = ref(props.modelValue.fullName || '')
const terminal = ref(props.modelValue.terminal || '')
const details = ref([...props.modelValue.details] || [])

const fuels = ref([])
const terminals = ['Callao', 'Lurín', 'Pisco', 'Monte Azul']

onMounted(async () => {
  fuels.value = await getFuels()
})

function getPricePerGal(productName) {
  const fuel = fuels.value.find(f => f.type === productName)
  return fuel ? fuel.pricePerGal : 'S/ 0.00'
}

function updateTotalPrice(detail) {
  const fuel = fuels.value.find(f => f.type === detail.product)
  const price = fuel ? parseFloat(fuel.pricePerGal.replace('S/', '').trim()) : 0
  const quantity = detail.quantity || 0
  detail.totalPrice = `S/ ${(price * quantity).toFixed(2)}`
}

function addDetail() {
  details.value.push({
    product: '',
    quantity: 0,
    note: '',
    totalPrice: 'S/ 0.00'
  })
}

function removeDetail(index) {
  details.value.splice(index, 1)
}

// Autoactualiza precios al cambiar producto o cantidad
watchEffect(() => {
  details.value.forEach(detail => {
    if (detail.product && detail.quantity > 0) {
      updateTotalPrice(detail)
    }
  })
})

// Emitir cambios al padre
watch([orderName, responsible, terminal, details], () => {
  emit('update:modelValue', {
    ...props.modelValue,
    orderName: orderName.value,
    fullName: responsible.value,
    terminal: terminal.value,
    details: details.value
  })

  submitted.value = true
  const invalid = !orderName.value || !responsible.value || !terminal.value || details.value.some(d => !d.product || d.quantity <= 0)
  if (invalid) emit('invalid')
  else emit('valid')
}, { deep: true })
</script>


<style scoped>
.fuel-price {
  font-size: 0.75rem;
  color: #64748b;
  margin-left: 0.5rem;
}
.product-price-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.step-order-details {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
}

.section-title, .detail-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.2rem 0 1rem;
  color: #1f2937;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-field {
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
}

.full-width {
  flex: 1 1 100%;
}

.details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.detail-row {
  display: grid;
  grid-template-columns: 1fr 0.7fr 0.7fr 1.1fr auto;
  gap: 0.5rem;
  align-items: center;
  background-color: #f9fafb;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.detail-input {
  width: 100%;
}

.detail-input.disabled {
  background-color: #f1f5f9;
  color: #64748b;
}

.invalid {
  border: 1px solid #ef4444 !important;
  background-color: #fef2f2 !important;
}
</style>
