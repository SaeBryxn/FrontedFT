<template>
  <Card class="order-card">
    <template #title>
      <div class="flex justify-between align-items-center">
        <div>
          <h4 class="text-xl font-bold text-primary">Terminal: {{ order.terminal }}</h4>
          <Tag :value="order.status" :severity="statusSeverity(order.status)" class="mt-2" rounded />
        </div>
      </div>
    </template>

    <template #content>
      <!-- Información general -->
      <div class="grid text-sm text-color-secondary mt-3 mb-3">
        <div class="col-12 md:col-6">
          <i class="pi pi-user mr-2" /><strong>Cliente:</strong> {{ order.user }}
        </div>
        <div class="col-6 md:col-3">
          <i class="pi pi-calendar mr-2" /><strong>Fecha:</strong> {{ formatDate(order.created) }}
        </div>
        <div class="col-6 md:col-3">
          <i class="pi pi-filter mr-2" /><strong>Galones:</strong> {{ formatGallons(order.amount) }}
        </div>
      </div>

      <!-- Línea de estado -->
      <div class="workflow-timeline mt-2 mb-4">
        <div v-for="(step, i) in steps" :key="i" class="step">
          <div class="circle" :class="{ active: i <= currentIndex, completed: i < currentIndex }">
            <i class="pi" :class="getIcon(step)"></i>
          </div>
          <span class="label">{{ step }}</span>
          <div v-if="i < steps.length - 1" class="line" :class="{ active: i < currentIndex }"></div>
        </div>
      </div>

      <!-- Botón para expandir -->
      <div class="mt-4">
        <Button
            :icon="expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            :label="expanded ? 'Ocultar' : 'Ver más'"
            @click="toggleExpanded"
            text
        />
      </div>

      <!-- Productos -->
      <div v-if="expanded" class="fade-in mt-4 border-top-1 pt-4">
        <p class="text-sm text-700 mb-3">
          <i class="" /><strong>Productos en la orden:</strong>
        </p>
        <div class="grid gap-3">
          <div
              v-for="(product, i) in order.products"
              :key="i"
              class="col-12 md:col-6 border-1 surface-100 border-round-md p-3"
          >
            <div class="flex justify-between align-items-center mb-2">
              <span class="font-semibold text-900">{{ product.product }}</span>
              <Tag :value="product.unit?.toUpperCase()" severity="info" />
            </div>
            <div class="text-sm text-color-secondary">
              <p>Cantidad: <strong>{{ product.quantity }}</strong></p>
              <p>Total: <strong>S/ {{ formatCurrency(product.total) }}</strong></p>
            </div>
          </div>
        </div>

        <!-- Solo botón de tracking -->
        <div class="flex justify-start mt-4">
          <Button icon="pi pi-map-marker" label="Ver tracking" outlined />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const props = defineProps({
  order: Object
})

const expanded = ref(false)
const toggleExpanded = () => (expanded.value = !expanded.value)

const steps = ['Requested', 'Approved', 'Released', 'Closed']
const currentIndex = computed(() => steps.indexOf(props.order.status))

function getIcon(status) {
  return {
    Requested: 'pi-clock',
    Approved: 'pi-check-circle',
    Released: 'pi-send',
    Closed: 'pi-box'
  }[status] || 'pi-question-circle'
}

function statusSeverity(status) {
  return {
    Requested: 'info',
    Approved: 'success',
    Released: 'primary',
    Delivered: 'success',
    Cancelled: 'danger'
  }[status] || 'secondary'
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function formatGallons(value) {
  const n = Number(value)
  return isNaN(n) ? '0 gal' : `${n.toFixed(0)} gal`
}

function formatCurrency(value) {
  const n = Number(value)
  return isNaN(n) ? '0.00' : n.toFixed(2)
}
</script>

<style scoped>
.order-card {
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
  background-color: var(--surface-card);
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.workflow-timeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem; /* ⬅️ AUMENTA espacio con respecto al botón */
}


.step {
  display: flex;
  align-items: center;
  position: relative;
}

.circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--surface-200);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.circle.active {
  background-color: var(--primary-color);
  color: #fff;
}

.circle.completed {
  background-color: var(--green-500);
  color: #fff;
}

.label {
  font-size: 0.7rem;
  text-align: center;
  position: absolute;
  top: 2.4rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-color-secondary);
  white-space: nowrap;
}

.line {
  height: 4px;
  width: 2rem;
  background-color: var(--surface-300);
  border-radius: 2px;
  transition: background-color 0.3s ease;
  margin: 0 0.25rem;
}

.line.active {
  background-color: var(--primary-color);
}

.product-box {
  border: 1px solid var(--surface-border);
  transition: box-shadow 0.2s ease;
}

.product-box:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
