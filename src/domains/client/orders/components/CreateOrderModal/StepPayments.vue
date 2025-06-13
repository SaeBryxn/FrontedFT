<template>
  <div class="step-payments">
    <h2 class="section-title">
      <i class="ph ph-credit-card text-green-600"></i>
      Pagos por Detalle
    </h2>

    <div
        v-for="(detail, detailIndex) in orderDetails"
        :key="detailIndex"
        class="order-section"
    >
      <div class="order-header">
        <div class="info-block">
          <span class="label"><i class="ph ph-gas-pump"></i> Producto</span>
          <span class="value">{{ detail.product || '—' }}</span>
        </div>
        <div class="info-block">
          <span class="label"><i class="ph ph-drop"></i> Cantidad</span>
          <span class="value">{{ detail.quantity }} gal</span>
        </div>
        <div class="info-block">
          <span class="label"><i class="ph ph-coins"></i> Total</span>
          <span class="value">{{ parseFloat(detail.totalPrice?.replace('S/', '') || '0').toFixed(2) }}</span>
        </div>
      </div>

      <div class="payment-summary mt-2 flex items-center gap-2">
        <Tag
            :value="'S/ ' + totalPagado(detailIndex) + ' / ' + parseFloat(detail.totalPrice?.replace('S/', '') || '0').toFixed(2)"
            :severity="tagSeverity(detailIndex)"
        />
        <span :class="['text-xs font-medium', tagTextColor(detailIndex)]">
          {{ tagMessage(detailIndex) }}
        </span>
      </div>

      <ProgressBar
          :value="Math.min((totalPagado(detailIndex) / parseFloat(detail.totalPrice?.replace('S/', '') || 1)) * 100, 100)"
          style="height: 10px; margin-top: 10px;"
          showValue="false"
      />

      <p v-if="(payments[detailIndex] || []).length === 0" class="text-sm text-gray-500 italic mt-2">
        No hay pagos registrados para este detalle.
      </p>

      <TransitionGroup name="fade" tag="div">
        <div
            v-for="(payment, paymentIndex) in payments[detailIndex] || []"
            :key="paymentIndex"
            class="payment-form p-3 rounded-lg border border-gray-200 bg-gray-50 shadow-sm mb-3"
        >
          <div class="field">
            <label><i class="ph ph-bank"></i> Cuenta Bancaria</label>
            <div class="bank-wrapper">
              <Dropdown
                  v-model="payment.account"
                  :options="bankOptions"
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Seleccione banco"
              />

              <img
                  v-if="payment.account"
                  :src="bankLogos[payment.account.trim()]"
                  alt="logo banco"
                  class="bank-logo"
              />




            </div>
          </div>

          <div class="field">
            <label><i class="ph ph-currency-circle-dollar"></i> Monto</label>
            <InputNumber
                v-model="payment.amount"
                mode="currency"
                currency="PEN"
                locale="es-PE"
            />
          </div>

          <div class="field">
            <label><i class="ph ph-calendar-blank"></i> Fecha y hora</label>
            <Calendar
                v-model="payment.date"
                showIcon
                showTime
                hourFormat="24"
            />
          </div>

          <div class="field with-remove">
            <label><i class="ph ph-barcode"></i> N° Operación</label>
            <div class="input-with-icon">
              <InputText
                  :value="payment.operationNumber"
                  placeholder="Se genera automáticamente"
                  disabled
                  class="w-full"
              />
              <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="() => removePayment(detailIndex, paymentIndex)"
                  v-if="(payments[detailIndex] || []).length > 1"
              />
            </div>
          </div>
        </div>
      </TransitionGroup>

      <Button
          icon="pi pi-plus-circle"
          label="Agregar Pago"
          class="mt-3"
          @click="() => addPayment(detailIndex)"
      />
    </div>
  </div>
</template>



<script setup>
import { computed, watch, ref, toRaw } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:modelValue', 'valid', 'invalid'])

const submitted = ref(false)
const orderDetails = computed(() => props.modelValue.details || [])
const payments = computed(() => props.modelValue.payments || [])

const bankOptions = [
  { name: 'BCP' },
  { name: 'BBVA' },
  { name: 'Interbank' }
]

const bankLogos = {
  BCP: '/img/banks/bcp.png',
  BBVA: '/img/banks/bbva.png',
  Interbank: '/img/banks/interbank.png'
}


// Verificación y validación automática
watch(
    payments,
    (newVal) => {
      let allValid = true

      newVal.forEach((group) => {
        group.forEach((p) => {
          if (!p.account || !p.amount || p.amount <= 0 || !p.date || !p.operationNumber) {
            allValid = false
          }
        })
      })

      if (allValid && newVal.length > 0) emit('valid')
      else emit('invalid')

      // Autogenerar número de operación si todo está bien
      newVal.forEach((group, detailIndex) => {
        group.forEach((payment, paymentIndex) => {
          if (
              payment.account &&
              payment.amount > 0 &&
              payment.date &&
              !payment.operationNumber
          ) {
            updatePayment(detailIndex, paymentIndex, 'operationNumber', generateOpNumber())
          }
        })
      })
    },
    { deep: true, immediate: true }
)

function addPayment(detailIndex) {
  const raw = toRaw(payments.value)
  const updated = raw.map(g => [...g])
  if (!updated[detailIndex]) updated[detailIndex] = []
  updated[detailIndex].push({ account: '', amount: 0, date: '', operationNumber: '' })
  emit('update:modelValue', { ...props.modelValue, payments: updated })
}

function removePayment(detailIndex, paymentIndex) {
  const raw = toRaw(payments.value)
  const updated = raw.map(g => [...g])
  if (updated[detailIndex]) updated[detailIndex].splice(paymentIndex, 1)
  emit('update:modelValue', { ...props.modelValue, payments: updated })
}

function updatePayment(detailIndex, paymentIndex, field, value) {
  const raw = toRaw(payments.value)
  const updated = raw.map(group => [...group])
  updated[detailIndex] = [...(updated[detailIndex] || [])]
  updated[detailIndex][paymentIndex] = {
    ...updated[detailIndex][paymentIndex],
    [field]: value
  }
  emit('update:modelValue', { ...props.modelValue, payments: updated })
}

function generateOpNumber() {
  return 'OP' + Math.random().toString(36).slice(2, 10).toUpperCase()
}

function totalPagado(index) {
  return (payments.value[index] || []).reduce((acc, p) => acc + Number(p.amount || 0), 0).toFixed(2)
}
function tagSeverity(index) {
  const total = parseFloat(orderDetails.value[index]?.totalPrice?.replace('S/', '') || 0)
  const paid = parseFloat(totalPagado(index))
  const pct = paid / total

  if (pct >= 1) return 'success'
  if (pct >= 0.75) return 'info'
  if (pct >= 0.4) return 'warning'
  return 'danger'
}

function tagMessage(index) {
  const total = parseFloat(orderDetails.value[index]?.totalPrice?.replace('S/', '') || 0)
  const paid = parseFloat(totalPagado(index))

  if (paid >= total) return 'Pagado completo'
  if (paid >= total * 0.75) return 'Casi completo'
  if (paid >= total * 0.4) return 'Falta cubrir más de la mitad'
  return 'Falta la mayor parte'
}

function tagTextColor(index) {
  const total = parseFloat(orderDetails.value[index]?.totalPrice?.replace('S/', '') || 0)
  const paid = parseFloat(totalPagado(index))
  const pct = paid / total

  if (pct >= 1) return 'text-green-700'
  if (pct >= 0.75) return 'text-blue-600'
  if (pct >= 0.4) return 'text-yellow-600'
  return 'text-red-600'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.step-payments {
  padding: 2rem 1.5rem;
}
.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}
.order-section {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}
.order-header {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e2e8f0;
  margin-bottom: 1.2rem;
}
.info-block {
  flex: 1 1 220px;
}
.label {
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.value {
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 0.2rem;
}
.payment-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  position: relative;
  border-bottom: 1px dashed #e2e8f0;
  animation: fadeIn 0.3s ease;
}
.bank-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.bank-logo {
  width: 40px;
  height: auto;
  max-height: 28px;
  object-fit: contain;
}


.input-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.total-amount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

