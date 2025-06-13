<template>
  <div class="provider-dashboard">
    <!-- 🧭 Header -->
    <div class="flex align-items-center justify-between mb-4">
      <div class="flex align-items-center gap-2">
        <i class="ph ph-briefcase text-2xl text-primary-600" />
        <h2 class="text-xl font-bold text-color">Proveedores Asociados</h2>
      </div>
    </div>

    <!-- 📊 Estadísticas -->
    <ProvidersStats />

    <!-- 📦 Lista de proveedores -->
    <section class="list-section mt-4">
      <div class="flex align-items-center justify-between mb-3">
        <div class="flex align-items-center gap-2">
          <i class="ph ph-list-bullets text-lg" />
          <h3 class="text-lg font-semibold text-color">Lista de Proveedores</h3>
        </div>
      </div>

      <!-- 💬 Lista con posibilidad de abrir chat -->
      <ProviderList @open-chat="handleOpenChat" />
    </section>

    <!-- 💬 Modal de chat -->
    <ChatModal
        v-if="selectedProvider"
        v-model:visible="chatVisible"
        :provider="selectedProvider"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Components
import ProvidersStats from '../components/ProviderStats.vue'
import ProviderList from '../components/ProviderList.vue'
import ChatModal from '../components/ChatModal.vue'

// Estado del chat
const chatVisible = ref(false)
const selectedProvider = ref(null)

function handleOpenChat(provider) {
  selectedProvider.value = provider
  chatVisible.value = true
}
</script>

<style scoped>
.provider-dashboard {
  padding: 2rem;
  background-color: var(--surface-ground);
}

.list-section {
  background: var(--surface-card);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
}
</style>
