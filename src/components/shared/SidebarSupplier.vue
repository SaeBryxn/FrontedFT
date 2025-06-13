<template>
  <aside class="sidebar-supplier">
    <div class="logo-block">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="sidebar-logo" />
      <h3 class="sidebar-title">FuelTrack</h3>
    </div>

    <div class="sidebar-menu">
      <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="sidebar-link"
          active-class="active"
      >
        <i :class="item.icon"></i>
        {{ $t(item.label) }}
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarSupplier',
  data() {
    return {
      menuItems: [
        { path: '/supplier/admin', label: 'sidebar.supplier.admin', icon: 'ph ph-user' },
        { path: '/supplier/orders', label: 'sidebar.supplier.orders', icon: 'ph ph-clipboard-text' },
        { path: '/supplier/conciliations', label: 'sidebar.supplier.conciliations', icon: 'ph ph-file-check' },
        { path: '/supplier/dispatch', label: 'sidebar.supplier.dispatch', icon: 'ph ph-truck' },
        { path: '/supplier/analytics', label: 'sidebar.supplier.analytics', icon: 'ph ph-chart-bar' },
        { path: '/supplier/prices', label: 'sidebar.supplier.prices', icon: 'ph ph-currency-dollar' },
        { path: '/supplier/clients', label: 'sidebar.supplier.clients', icon: 'ph ph-headphones' }
      ]
    };
  }
};
</script>

<style scoped>
.sidebar-supplier {
  background-color: #0A2C47;
  color: #ffffff;
  width: 260px;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.sidebar-logo {
  height: 36px;
}

.sidebar-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  background-color: transparent;
}

.sidebar-link:hover {
  background-color: #1e3a5f;
  color: #ffffff;
  transform: translateX(6px);
}

.sidebar-link::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: #22c55e;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar-link:hover::before {
  opacity: 1;
}

.sidebar-link i {
  font-size: 1.1rem;
}

.active {
  background-color: #22c55e !important;
  color: white !important;
  font-weight: 600;
  transform: translateX(8px);
}

.active::before {
  opacity: 1;
}
</style>
