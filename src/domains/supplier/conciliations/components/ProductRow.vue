<template>
  <div class="product-row">
    <DataTable :value="[product]" class="p-datatable-sm">
      <Column field="product" header="Product" />
      <Column field="quantity" header="Quantity" />
      <Column field="unit" header="Unit" />
      <Column header="Price" :body="row => formatCurrency(row.price)" />
      <Column field="total" header="Total" />
      <Column style="width: 60px">
        <template #body>
          <Button
              :icon="expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
              text
              rounded
              class="expand-btn"
              @click="expanded = !expanded"
          />
        </template>
      </Column>
    </DataTable>

    <div v-if="expanded" class="expanded">
      <PaymentDetails
          :product="product"
          @update="onPaymentsUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PaymentDetails from './PaymentDetails.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['validated'])
const expanded = ref(false)

watch(
    () => props.product,
    () => {
      checkAllValidated()
    },
    { immediate: true }
)

function onPaymentsUpdate() {
  checkAllValidated()
}

function checkAllValidated() {
  const payments = props.product.payments || []
  const isValid = payments.length > 0 && payments.every(p => p.validated)
  emit('validated', { product: props.product.product, validated: isValid })
}

function formatCurrency(value) {
  const val = parseFloat(value)
  if (isNaN(val)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(val).replace('PEN', 'S/')
}
</script>

<style scoped>
.product-row {
  background-color: #1b2d47;
  border-radius: 10px;
  margin-top: 1rem;
  padding-bottom: 1rem;
  color: #ffffff;
  overflow: hidden;
}

/* Tabla PrimeVue */
:deep(.p-datatable) {
  background-color: #1b2d47;
  border-radius: 0;
}

:deep(.p-datatable thead th) {
  background-color: #22324c;
  color: #cbd5e1;
  font-size: 0.85rem;
}

:deep(.p-datatable tbody td) {
  background-color: #1b2d47;
  border-bottom: 1px solid #32445f;
  font-size: 0.82rem;
}

/* Botón expandible */
:deep(.expand-btn.p-button) {
  font-size: 1rem;
  color: #94a3b8;
  background: none;
  border: none;
  padding: 0.3rem;
}

/* Contenedor del detalle */
.expanded {
  padding: 0.5rem 1rem 1rem;
  background-color: #142538;
}
</style>
