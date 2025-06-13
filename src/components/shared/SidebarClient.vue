<template>
  <div class="sidebar-wrapper">
    <!-- Botón hamburguesa -->
    <Button
        icon="pi pi-bars"
        class="toggle-button"
        @click="isVisible = !isVisible"
        aria-label="Abrir menú"
        text
        rounded
    />

    <!-- Panel lateral -->
    <transition name="slide">
      <aside v-if="isVisible" class="sidebar-panel">
        <div class="logo-block">
          <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
          <h3 class="title">FuelTrack</h3>
        </div>

        <div class="menu">
          <Button
              v-for="item in menuItems"
              :key="item.label"
              :label="$t(item.label)"
              :icon="item.icon"
              :class="['p-button-text menu-btn', isActive(item.path) ? 'active' : '']"
              @click="navigate(item.path)"
          />
        </div>
      </aside>
    </transition>

    <!-- Fondo semitransparente en móvil -->
    <div v-if="isVisible && isMobile" class="overlay" @click="isVisible = false"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'

const isVisible = ref(true)
const isMobile = ref(false)
const router = useRouter()
const route = useRoute()

const menuItems = [
  { label: 'sidebar.client.admin', icon: 'pi pi-user', path: '/client/admin' },
  { label: 'sidebar.client.orders', icon: 'pi pi-file', path: '/client/orders' },
  { label: 'sidebar.client.analytics', icon: 'pi pi-chart-bar', path: '/client/analytics' },
  { label: 'sidebar.client.terminals', icon: 'pi pi-map-marker', path: '/client/terminals' },
  { label: 'sidebar.client.provider', icon: 'pi pi-briefcase', path: '/client/provider' },
  { label: 'sidebar.client.workflows', icon: 'pi pi-share-alt', path: '/client/workflows' }
]

function navigate(path) {
  router.push(path)
  if (isMobile.value) isVisible.value = false
}

function isActive(path) {
  return route.path === path
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
</script>

<style scoped>
.sidebar-wrapper {
  position: relative;
}

/* Botón hamburguesa */
.toggle-button {
  display: none;
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 20;
}

/* Panel lateral */
.sidebar-panel {
  width: 240px;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 1.5rem 1rem;
  border-right: 1px solid #e2e8f0;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 15;
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.logo {
  width: 36px;
  height: auto;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #334155;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-btn {
  justify-content: flex-start;
  padding-left: 1rem;
  text-align: left;
  border-radius: 8px;
}

.active {
  background-color: var(--primary-100);
  color: var(--primary-color);
  font-weight: 600;
}

/* Animaciones */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* Modo móvil */
@media (max-width: 768px) {
  .toggle-button {
    display: inline-flex;
  }
  .sidebar-panel {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.4);
  }
}
</style>
