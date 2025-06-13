<template>
  <section class="released-orders">
    <h1 class="title">Released Orders</h1>

    <div v-if="orders.length === 0" class="empty-message">
      No released orders available.
    </div>

    <div v-else class="orders-list">
      <Card v-for="order in orders" :key="order.id" class="order-card">
        <template #title>
          <div class="header">
            <h2>Order: {{ order.orderId }}</h2>
            <span class="date">{{ formatDate(order.created) }}</span>
          </div>
        </template>

        <template #content>
          <div class="info-grid">
            <div><strong>Client:</strong> {{ order.user }}</div>
            <div><strong>Terminal:</strong> {{ order.terminal }}</div>
            <div><strong>Amount:</strong> {{ formatCurrency(order.amount) }}</div>
          </div>

          <div class="transport-section" v-if="order.transport">
            <h3>Transport Info</h3>
            <ul>
              <li><strong>Truck:</strong> {{ order.transport.truck.plate }}</li>
              <li><strong>Driver:</strong> {{ order.transport.driver.name }}</li>
              <li><strong>Tank:</strong> {{ order.transport.tank.code }}</li>
            </ul>
          </div>

          <div class="products-section">
            <h3>Products</h3>
            <DataTable :value="order.products" class="dark-table" responsiveLayout="scroll">
              <Column field="product" header="Product" />
              <Column field="quantity" header="Quantity" />
              <Column field="unit" header="Unit" />
              <Column header="Price" :body="p => formatCurrency(p.price)" />
              <Column header="Total" :body="p => formatCurrency(p.total)" />
            </DataTable>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import API_BASE from '@/services/api'
import { error as logError } from '@/services/logger'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const orders = ref([])

async function fetchReleasedOrders() {
  try {
    const res = await axios.get(`${API_BASE}/orders?status=Released`)
    orders.value = res.data
  } catch (error) {
    logError('❌ Error fetching released orders:', error)
  }
}

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase()
}

function formatCurrency(value) {
  const num = parseFloat(typeof value === 'string' ? value.replace('S/', '').trim() : value)
  if (isNaN(num)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(num).replace('PEN', 'S/')
}

onMounted(fetchReleasedOrders)
</script>

<style scoped>
.released-orders {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}

.title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.empty-message {
  font-size: 1rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 2rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card :deep(.p-card) {
  background-color: #13253c;
  border-radius: 12px;
  color: #ffffff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 0.85rem;
  color: #cbd5e1;
}

.info-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.transport-section ul {
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

.products-section {
  margin-top: 1rem;
}

.dark-table :deep(.p-datatable) {
  background-color: #1a314a;
  border-radius: 8px;
  color: #ffffff;
}

.dark-table :deep(.p-datatable-thead > tr > th) {
  background-color: #1e3955;
  color: #cbd5e1;
}

.dark-table :deep(.p-datatable-tbody > tr > td) {
  border-bottom: 1px solid #2c445f;
  font-size: 0.85rem;
}
</style>
