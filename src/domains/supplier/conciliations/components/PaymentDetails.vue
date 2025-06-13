<template>
  <div v-if="product.payments?.length" class="payment-wrapper">
    <DataTable :value="product.payments" class="p-datatable-sm">
      <Column field="bank" header="Bank Account" />
      <Column
          field="amount"
          header="Payment Amount"
          :body="formatAmount"
      />
      <Column
          field="date"
          header="Date"
          :body="formatDate"
      />
      <Column
          field="operation"
          header="Operation Number"
      />
      <Column header="Validated" class="text-center">
        <template #body="slotProps">
          <div class="validated-icon">
            <Checkbox
                v-model="slotProps.data.validated"
                binary
                @change="emitChange"
            />
            <i
                :class="[
                'ph',
                slotProps.data.validated ? 'ph-check-circle' : 'ph-circle'
              ]"
                :style="{ color: slotProps.data.validated ? '#22c55e' : '#f97316' }"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <div v-else class="no-payments">
    <p>No payments registered for this product.</p>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

const props = defineProps({
  product: Object
})

const emit = defineEmits(['update'])

watch(
    () => props.product?.payments,
    () => emitChange(),
    { deep: true, immediate: true }
)

function emitChange() {
  const payments = props.product?.payments || []
  const allValid = payments.length > 0 && payments.every(p => p.validated === true)
  emit('update', { validated: allValid })
}

function formatAmount(row) {
  const val = parseFloat(row.amount)
  return isNaN(val)
      ? 'S/ 0.00'
      : new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      })
          .format(val)
          .replace('PEN', 'S/')
}

function formatDate(row) {
  if (!row.date) return '—'
  return new Date(row.date).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.payment-wrapper {
  margin-top: 1rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: #0d213b;
  color: #ffffff;
}

/* Fondo y colores coherentes con tema oscuro */
:deep(.p-datatable) {
  background-color: #0d213b;
  color: #ffffff;
}

:deep(.p-datatable thead th) {
  background-color: #1c2e4a;
  color: #cbd5e1;
  font-size: 0.85rem;
}

:deep(.p-datatable tbody td) {
  background-color: #0d213b;
  color: #ffffff;
  font-size: 0.82rem;
  border-bottom: 1px solid #1e324e;
}

/* Checkbox e ícono de validación */
.validated-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.text-center {
  text-align: center;
}

.no-payments {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #1a2a42;
  font-size: 0.85rem;
  color: #94a3b8;
  text-align: center;
}
</style>
