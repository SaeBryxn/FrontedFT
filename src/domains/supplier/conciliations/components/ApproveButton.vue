<template>
  <Button
      :label="approved ? 'Approved' : 'Approve'"
      :icon="approved ? 'ph ph-check-circle' : 'ph ph-check'"
      :disabled="approved"
      class="approve-btn"
      :class="{ approved }"
      @click="$emit('approve')"
  />
</template>

<script setup>
import Button from 'primevue/button'

const props = defineProps({
  approved: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['approve'])
</script>

<style scoped>
:deep(.approve-btn.p-button) {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  background-color: #1e3a5f;
  color: #cbd5e1;
  border: none;
  transition: background-color 0.2s ease;
}

:deep(.approve-btn.p-button:hover:not(.p-disabled)) {
  background-color: #2c4d75;
}

:deep(.approve-btn.approved.p-button) {
  background-color: #22c55e33;
  color: #22c55e;
  cursor: default;
}

:deep(.approve-btn.approved.p-button:hover) {
  background-color: #22c55e33;
}
</style>
