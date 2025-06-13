<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="Load Bank Statement"
      class="custom-modal"
      :closable="false"
  >
    <!-- Zona de arrastre -->
    <div class="dropzone" @click="fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
      <i class="ph ph-cloud-arrow-up icon" />
      <p class="drop-text">Click or drag files here</p>
      <small class="format-hint">PDF, XLSX and XLS formats, up to 50MB</small>
      <input
          type="file"
          ref="fileInput"
          accept=".pdf,.xls,.xlsx"
          multiple
          hidden
          @change="handleFileChange"
      />
    </div>

    <!-- Lista de archivos -->
    <div v-if="files.length" class="file-list">
      <div v-for="(file, index) in files" :key="index" class="file-card">
        <i class="ph ph-file-pdf file-icon" />
        <div class="file-info">
          <strong class="file-name">{{ file.name }}</strong>
          <small class="file-size">{{ formatSize(file.size) }}</small>
        </div>
        <Button icon="pi pi-times" text rounded @click="removeFile(index)" />
      </div>
    </div>

    <!-- Acciones -->
    <div class="actions">
      <Button
          label="Load"
          icon="pi pi-upload"
          class="p-button-success"
          :disabled="!files.length"
          @click="loadFiles"
      />
      <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-danger"
          @click="close"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

// 👇 Control externo con v-if
const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(props.modelValue)
const files = ref([])
const fileInput = ref(null)

watch(() => props.modelValue, val => visible.value = val)
watch(visible, val => emit('update:modelValue', val))

function handleDrop(e) {
  files.value = [...files.value, ...Array.from(e.dataTransfer.files)]
}
function handleFileChange(e) {
  files.value = [...files.value, ...Array.from(e.target.files)]
}
function removeFile(index) {
  files.value.splice(index, 1)
}
function close() {
  visible.value = false
}
function loadFiles() {
  emit('submit', files.value)
  files.value = []
  close()
}
function formatSize(bytes) {
  const kb = bytes / 1024
  return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(2)} MB`
}
</script>

<style scoped>
:deep(.custom-modal .p-dialog-content) {
  background-color: #1e2e4a;
  color: #ffffff;
}

:deep(.custom-modal .p-dialog-header) {
  background-color: #1e2e4a;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #334155;
}

.dropzone {
  border: 2px dashed #334155;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #0f1e30;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 1rem;
}

.dropzone:hover {
  background-color: #152c45;
}

.icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #f97316;
}

.drop-text {
  font-size: 0.95rem;
  font-weight: 500;
}

.format-hint {
  font-size: 0.75rem;
  color: #94a3b8;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.file-card {
  background-color: #253853;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-icon {
  font-size: 1.5rem;
  color: #f87171;
}

.file-info {
  flex-grow: 1;
}

.file-name {
  font-size: 0.85rem;
  font-weight: 500;
}

.file-size {
  font-size: 0.75rem;
  color: #cbd5e1;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
