<template>
  <button class="lang-toggle" @click="toggleLanguage">
    {{ currentLabel }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLabel = computed(() => (locale.value === 'es' ? 'EN' : 'ES'))

function toggleLanguage() {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}
</script>

<style scoped>
.lang-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background-color: #219653;
  color: white;
  font-weight: bold;
  z-index: 1000;
}
</style>
