<template>
  <div class="step-confirm">
    <h2 class="section-title">
      <i class="ph ph-clipboard-check"></i> Confirmar Orden
    </h2>

    <!-- Información general -->
    <div class="section-box">
      <p><i class="ph ph-user-circle"></i> <strong>Responsable:</strong> {{ data.fullName || '—' }}</p>
      <p><i class="ph ph-map-pin"></i> <strong>Terminal:</strong> {{ data.terminal || '—' }}</p>
    </div>

    <!-- Detalles de productos -->
    <div class="section-box">
      <h3><i class="ph ph-fuel"></i> Productos solicitados</h3>
      <ul>
        <li v-for="(detail, index) in data.details" :key="index">
          <div class="detail-line">
            <span><strong>{{ detail.product }}</strong> — {{ detail.quantity }} gal</span>
            <span class="right">S/ {{ formatPrice(detail.totalPrice) }}</span>
          </div>
          <div class="detail-status">
            <Tag
                :value="tagMessage(index)"
                :severity="tagSeverity(index)"
                class="mr-2"
            />
            <ProgressBar
                :value="paymentPercent(index)"
                showValue="false"
                style="height: 6px; width: 100px;"
            />
          </div>
        </li>
      </ul>
    </div>

    <!-- Pagos registrados -->
    <div class="section-box" v-if="data.payments.length">
      <h3><i class="ph ph-currency-circle-dollar"></i> Pagos</h3>
      <div v-for="(group, index) in data.payments" :key="index" class="payment-group">
        <p class="group-title">→ Pago para <strong>{{ data.details[index]?.product || '—' }}</strong></p>
        <ul>
          <li v-for="(p, i) in group" :key="i">
            <i class="ph ph-bank"></i>
            {{ p.account }} — S/ {{ Number(p.amount).toFixed(2) }} — {{ p.date || '—' }}
            <span class="operation">#{{ p.operationNumber || '—' }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Total final -->
    <div class="section-box total-box">
      <i class="ph ph-wallet"></i>
      <span class="label">Total a pagar:</span>
      <span class="amount">S/ {{ calcularTotal }}</span>
    </div>

    <!-- Validación -->
    <div class="validation-box" :class="isValid ? 'valid' : 'invalid'">
      <i :class="isValid ? 'ph ph-check-circle' : 'ph ph-x-circle'" class="icon"></i>
      <span>{{ isValid ? 'Todos los pagos están completos.' : 'Faltan pagos por completar.' }}</span>
    </div>
  </div>
  <!-- Botón de confirmación -->
  <div class="button-box">
    <Button
        label="Confirmar Orden"
        icon="pi pi-check"
        severity="success"
        class="mt-4"
        @click="emit('valid')"  :disabled="!isValid"
    />
  </div>

</template>

<script setup>
import { computed, watch } from 'vue'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Button from 'primevue/button'

const emit = defineEmits(['update:isValid'])

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const data = computed(() => props.modelValue)

function cleanPrice(value) {
  if (!value) return 0
  const num = value.replace('S/', '').replace(',', '').trim()
  return parseFloat(num) || 0
}

function formatPrice(value) {
  const num = cleanPrice(value)
  return num.toFixed(2)
}

const calcularTotal = computed(() =>
    data.value.details.reduce((acc, d) => acc + cleanPrice(d.totalPrice), 0).toFixed(2)
)

function totalPagado(index) {
  const pagos = data.value.payments[index] || []
  return pagos.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0)
}

function paymentPercent(index) {
  const total = cleanPrice(data.value.details[index]?.totalPrice)
  const paid = totalPagado(index)
  return Math.min((paid / total) * 100, 100)
}

function tagSeverity(index) {
  const total = cleanPrice(data.value.details[index]?.totalPrice)
  const paid = totalPagado(index)
  const pct = paid / total

  if (pct >= 1) return 'success'
  if (pct >= 0.75) return 'info'
  if (pct >= 0.4) return 'warning'
  return 'danger'
}

function tagMessage(index) {
  const total = cleanPrice(data.value.details[index]?.totalPrice)
  const paid = totalPagado(index)

  if (paid >= total) return 'Pagado completo'
  if (paid >= total * 0.75) return 'Casi completo'
  if (paid >= total * 0.4) return 'Falta cubrir más de la mitad'
  return 'Falta la mayor parte'
}

const isValid = computed(() => {
  return data.value.details.every((d, i) => {
    const total = cleanPrice(d.totalPrice)
    return totalPagado(i) >= total
  })
})

watch(isValid, (val) => {
  emit('update:isValid', val)
}, { immediate: true })
</script>

<style scoped>
.step-confirm {
  padding: 1.5rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.section-box h3 {
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
  color: #0f172a;
}

.section-box p {
  font-size: 0.875rem;
  margin: 0.2rem 0;
  color: #334155;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

ul li {
  padding: 0.4rem 0;
  font-size: 0.85rem;
  border-bottom: 1px dashed #e2e8f0;
  color: #475569;
}

ul li:last-child {
  border-bottom: none;
}

.detail-line {
  display: flex;
  justify-content: space-between;
}

.detail-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.right {
  color: #0f172a;
  font-weight: 500;
}

.operation {
  font-size: 0.75rem;
  color: #64748b;
}

.group-title {
  font-weight: 500;
  font-size: 0.85rem;
  margin-bottom: 0.3rem;
}

.total-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #bbf7d0;
}

.total-box i {
  font-size: 1.2rem;
  margin-right: 0.4rem;
  color: #10b981;
}

.total-box .amount {
  font-size: 1.1rem;
  color: #0f172a;
}

.validation-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
}

.validation-box.valid {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #bbf7d0;
}

.validation-box.invalid {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.validation-box .icon {
  font-size: 1.2rem;
}
</style>
