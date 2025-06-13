<template>
  <Dialog
      v-model:visible="visible"
      modal
      :closable="false"
      :style="{ width: '60vw' }"
      header="Crear nueva orden"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <span class="text-xl font-bold text-surface-900">Crear nueva orden</span>
        <Button icon="pi pi-times" severity="secondary" text rounded @click="emit('close')" />
      </div>
    </template>

    <ProgressStepper :current-step="step" :steps="stepItems" class="mb-4" />

    <component
        :is="currentComponent"
        v-model:modelValue="formData"
        @invalid="handleInvalid"
        @valid="handleValid"
        @confirm="confirmOrder"
    />

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button v-if="step > 1" label="Atrás" severity="secondary" @click="prevStep" />
        <Button
            v-if="step < 3"
            label="Siguiente"
            severity="primary"
            :disabled="!isStepValid"
            @click="nextStep"
        />
        <Button
            v-else
            label="Confirmar"
            severity="success"
            :disabled="!isStepValid"
            @click="confirmOrder"
        />
      </div>
    </template>
  </Dialog>
  <OrderSuccessDialog ref="successDialog" @closed="handleSuccessClosed" />

</template>

<script setup>
import ProgressStepper from './ProgressStepper.vue'
import { ref, computed, nextTick, defineExpose } from 'vue'
import { useOrdersStore } from '@/domains/client/orders/store/useOrdersStore'
import { error as logError } from '@/services/logger'
import StepOrderDetails from './StepOrderDetails.vue'
import StepPayments from './StepPayments.vue'
import StepConfirmOrder from './StepConfirmOrder.vue'
import OrderSuccessDialog from './OrderSuccessDialog.vue'

const emit = defineEmits(['close'])

const visible = ref(true)
const step = ref(1)
const isStepValid = ref(false)
const successDialog = ref(null)
const ordersStore = useOrdersStore()

const formData = ref({
  fullName: '',
  terminal: '',
  details: [{ product: '', quantity: 0, note: '', totalPrice: '0.00' }],
  payments: []
})

const stepItems = ref([
  { label: 'Orden', icon: 'pi pi-file-edit', status: 'pending' },
  { label: 'Pago', icon: 'pi pi-wallet', status: 'pending' },
  { label: 'Confirmar', icon: 'pi pi-check-circle', status: 'pending' }
])

const currentComponent = computed(() => {
  if (step.value === 1) return StepOrderDetails
  if (step.value === 2) return StepPayments
  return StepConfirmOrder
})

function handleValid() {
  isStepValid.value = true
  stepItems.value[step.value - 1].status = 'completed'
}
function handleSuccessClosed() {
  resetModal()
  nextTick(() => {
    visible.value = true
  })
}

function handleInvalid() {
  isStepValid.value = false
  stepItems.value[step.value - 1].status = 'failed'
}

function nextStep() {
  if (isStepValid.value && step.value < 3) {
    step.value++
    isStepValid.value = false
  }
}

function prevStep() {
  step.value--
  isStepValid.value = true
}

// 🎯 Función que reinicia todo
function resetModal() {
  step.value = 1
  isStepValid.value = false
  formData.value = {
    fullName: '',
    terminal: '',
    details: [{ product: '', quantity: 0, note: '', totalPrice: '0.00' }],
    payments: []
  }
  stepItems.value.forEach(s => s.status = 'pending')
}

// ✅ Confirmar y mostrar diálogo de éxito
async function confirmOrder() {
  try {
    const enrichedProducts = formData.value.details.map((detail, index) => {
      const quantity = Number(detail.quantity)
      const unitPrice = quantity > 0
          ? (parseFloat(detail.totalPrice.replace('S/', '').trim()) / quantity).toFixed(2)
          : '0.00'

      return {
        product: detail.product,
        quantity,
        unit: 'gal',
        price: unitPrice,
        total: detail.totalPrice,
        payments: (formData.value.payments[index] || []).map(p => ({
          bank: p.account,
          amount: p.amount,
          date: p.date,
          operation: p.operationNumber,
          validated: false
        }))
      }
    })

    await ordersStore.addOrder({
      id: Date.now(),
      created: new Date().toISOString().split('T')[0],
      user: formData.value.fullName,
      terminal: formData.value.terminal,
      amount: calcularTotal(formData.value.details),
      orderId: generarOrderId(),
      status: 'Requested',
      products: enrichedProducts
    })

    visible.value = false
    successDialog.value?.showDialog()

    // Esperar que el modal de éxito se cierre y luego reiniciar
    setTimeout(() => {
      resetModal()
    }, 500)
  } catch (err) {
    logError('Error al confirmar orden:', err.message)
  }
}

// 👉 Exponer para el padre si deseas reabrir con estado limpio
function resetAndOpen() {
  resetModal()
  nextTick(() => {
    visible.value = true
  })
}

defineExpose({ resetAndOpen })

function generarOrderId() {
  return 'd_' + Math.random().toString(36).substring(2, 12)
}
function calcularTotal(details) {
  return `S/ ${details.reduce((acc, d) => acc + parseFloat(d.totalPrice.replace('S/', '').trim() || 0), 0).toFixed(2)}`
}
</script>


<style scoped>
/* Mismo estilo que ya tenías, bien organizado y moderno */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #ffffff;
  width: 90%;
  max-width: 880px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: fadeInUp 0.35s ease-out;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.modal-content:hover {
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
}

.modal-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #1e293b;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  background-color: #ffffff;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 8px;
}

.modal-footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f9fafb;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease, transform 0.1s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn.primary {
  background-color: #3b82f6;
  color: #ffffff;
}

.btn.primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.btn.secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn.secondary:hover {
  background-color: #d1d5db;
  transform: translateY(-1px);
}

.btn.success {
  background-color: #10b981;
  color: #ffffff;
}

.btn.success:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
