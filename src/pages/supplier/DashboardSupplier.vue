<template>
  <div class="dashboard-supplier dark-theme">
    <SidebarSupplier />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarSupplier from "@/components/shared/SidebarSupplier.vue";

export default {
  name: 'DashboardSupplier',
  components: {
    SidebarSupplier
  }
}
</script>

<style scoped>
.dashboard-supplier {
  display: flex;
  min-height: 100vh;
  background-color: #0f172a; /* Dark navy */
  color: #f1f5f9;
}

/* Sidebar fijo */
.sidebar-supplier {
  width: 240px;
  flex-shrink: 0;
}

/* Contenido principal */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #1e293b; /* Azul oscuro más suave */
  color: #f8fafc;
}
</style>
