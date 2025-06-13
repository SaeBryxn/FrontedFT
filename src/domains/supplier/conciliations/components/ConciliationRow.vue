<template>
  <div class="conciliation-row">
    <table class="products-table">
      <thead>
      <tr>
        <th></th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Price</th>
        <th>Total</th>
        <th class="text-center">Validated</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(product, index) in products" :key="index">
        <!-- Fila de producto -->
        <tr>
          <td>
            <button class="expand-btn" @click="toggleExpanded(index)">
              <i :class="['ph', expanded.includes(index) ? 'ph-caret-down' : 'ph-caret-right']"></i>
            </button>
          </td>
          <td>{{ product.product }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ formatCurrency(product.total) }}</td>
          <td class="text-center">
            <i
                class="ph ph-check-circle"
                v-if="validated[index]"
                style="color: #22c55e"
            ></i>
            <i
                class="ph ph-circle"
                v-else
                style="color: #f97316"
            ></i>
          </td>
        </tr>

        <!-- Fila expandida: pagos -->
        <tr v-if="expanded.includes(index)">
          <td colspan="7">
            <PaymentDetails
                :product="product"
                @update="(payload) => onProductValidated(index, payload.validated)"
            />
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <!-- Botón approve abajo del bloque -->
    <div class="footer">
      <button
          class="approve-btn"
          :disabled="!canApprove"
          @click="emit('approve')"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PaymentDetails from './PaymentDetails.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['approve'])

const expanded = ref([])
const validated = ref({}) // { 0: true, 1: false, ... }

function toggleExpanded(index) {
  if (expanded.value.includes(index)) {
    expanded.value = expanded.value.filter(i => i !== index)
  } else {
    expanded.value.push(index)
  }
}

function onProductValidated(index, isValid) {
  validated.value[index] = isValid
}

const canApprove = computed(() => {
  return props.products.length > 0 &&
      props.products.every((_, i) => validated.value[i] === true)
})

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
.conciliation-row {
  background-color: #1b2d47;
  margin-top: 0.5rem;
  border-radius: 10px;
  overflow: hidden;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #22324c;
}

th,
td {
  padding: 0.7rem 1rem;
  font-size: 0.82rem;
  border-bottom: 1px solid #32445f;
  text-align: left;
}

.text-center {
  text-align: center;
}

.expand-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
}

.footer {
  padding: 1rem;
  text-align: right;
  background-color: #1f324c;
}

.approve-btn {
  background-color: #22c55e;
  color: white;
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.approve-btn:disabled {
  background-color: #64748b;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
