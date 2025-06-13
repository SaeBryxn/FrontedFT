<template>
  <Transition name="fade-scale">
    <Dialog
        v-if="visible"
        v-model:visible="visible"
        modal
        :closable="false"
        :style="{ width: '26rem' }"
        class="rounded-xl"
        :pt="{
        root: { class: 'rounded-xl p-6' },
        header: { class: 'hidden' },
        content: { class: 'text-center flex flex-col items-center justify-center' }
      }"
    >
      <Vue3Lottie
          animation-link="https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json"
          :height="180"
          :width="180"
          :loop="false"
          :autoplay="true"
          class="mb-4"
      />
      <p class="text-xl font-semibold text-surface-800">¡Orden enviada con éxito!</p>
      <p class="text-sm text-surface-500 mt-2">Gracias por confiar en nuestro servicio.</p>
      <Button
          label="Entendido"
          icon="pi pi-check"
          severity="success"
          class="mt-5"
          @click="closeDialog"
      />
    </Dialog>
  </Transition>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

const emit = defineEmits(['closed'])
const visible = ref(false)

function showDialog() {
  visible.value = true
}

function closeDialog() {
  visible.value = false
  setTimeout(() => emit('closed'), 350) // Espera que termine la animación
}

defineExpose({ showDialog })
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.35s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
