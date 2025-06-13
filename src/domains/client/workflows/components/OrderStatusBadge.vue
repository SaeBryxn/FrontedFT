<template>
  <Tag
      :value="label"
      :severity="severity"
      rounded
      class="status-tag text-sm px-3 py-1 font-semibold"
  />
</template>

<script setup>
import Tag from 'primevue/tag'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusMap = {
  Requested: { label: 'Solicitado', severity: 'info' },
  Approved: { label: 'Aprobado', severity: 'success' },
  Rejected: { label: 'Rechazado', severity: 'danger' },
  Pending: { label: 'Pendiente', severity: 'warning' },
  Released: { label: 'Liberado', severity: 'primary' },
  Delivered: { label: 'Entregado', severity: 'success' }
}

const label = statusMap[props.status]?.label || 'Desconocido'
const severity = statusMap[props.status]?.severity || 'secondary'
</script>

<style scoped>
.status-tag {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}
</style>
