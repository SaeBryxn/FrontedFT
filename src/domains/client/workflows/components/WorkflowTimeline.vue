<template>
  <div class="timeline-card">
    <h4 class="mb-3 text-lg font-bold text-primary">Seguimiento del Estado</h4>

    <Timeline :value="steps" layout="vertical" class="custom-timeline">
      <!-- Ícono de estado -->
      <template #marker="slotProps">
        <Tag
            :value="slotProps.item.label"
            :severity="slotProps.item.severity"
            class="status-tag"
        />
      </template>

      <!-- Contenido del paso -->
      <template #content="slotProps">
        <div class="timeline-entry fade-in">
          <div class="flex align-items-center gap-2 mb-1">
            <i :class="['pi', slotProps.item.icon]" class="text-xl text-primary"></i>
            <p class="text-base font-semibold text-800 m-0">{{ slotProps.item.label }}</p>
          </div>
          <p class="text-sm text-color-secondary m-0">{{ slotProps.item.description }}</p>
          <small class="text-xs text-color-secondary">{{ slotProps.item.date }}</small>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Timeline from 'primevue/timeline'
import Tag from 'primevue/tag'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
})

const steps = computed(() => {
  const baseSteps = [
    {
      status: 'Requested',
      label: 'Solicitado',
      description: 'El cliente ha enviado la orden.',
      date: formatDate(props.createdAt),
      severity: 'info',
      icon: 'pi-clock'
    },
    {
      status: 'Approved',
      label: 'Aprobado',
      description: 'La orden fue aprobada por el proveedor.',
      severity: 'success',
      icon: 'pi-check-circle'
    },
    {
      status: 'Released',
      label: 'Liberado',
      description: 'La orden ha sido liberada para el despacho.',
      severity: 'primary',
      icon: 'pi-send'
    },
    {
      status: 'Delivered',
      label: 'Entregado',
      description: 'La orden fue entregada al cliente.',
      severity: 'success',
      icon: 'pi-box'
    }
  ]

  const index = baseSteps.findIndex(s => s.status === props.status)
  return baseSteps.slice(0, index + 1)
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString('es-PE', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.timeline-card {
  background: var(--surface-card);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
  margin-top: 1.5rem;
}

.timeline-entry {
  padding: 0.75rem;
  margin-left: 0.5rem;
  border-left: 3px solid var(--primary-color);
  background-color: var(--surface-ground);
  border-radius: 0.5rem;
}

.status-tag {
  margin-bottom: 0.75rem;
  min-width: 7rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
}

.custom-timeline ::v-deep(.p-timeline-event-opposite) {
  display: none;
}

.custom-timeline ::v-deep(.p-timeline-event) {
  margin-bottom: 1.5rem;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
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

@media (max-width: 768px) {
  .timeline-card {
    padding: 1rem;
  }

  .status-tag {
    font-size: 0.7rem;
  }

  .timeline-entry {
    padding: 0.5rem;
  }
}
</style>

