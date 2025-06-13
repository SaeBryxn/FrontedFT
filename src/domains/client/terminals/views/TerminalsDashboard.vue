<template>
  <div class="terminals-dashboard">
    <h1 class="section-title">
      <i class="ph ph-map-trifold"></i>
      Terminal Management
    </h1>

    <!-- Resumen -->
    <section class="section-box">
      <TerminalsSummary />
    </section>

    <!-- Gráfico comparativo -->
    <section class="section-box">
      <TerminalComparisonChart />
    </section>

    <!-- Mapa y camiones -->
    <section class="section-box">
      <TruckMap />
    </section>
  </div>
</template>

<script setup>
import TerminalsSummary from '../components/TerminalsSummary.vue'
import TerminalComparisonChart from '../components/TerminalComparisonChart.vue'
import TruckMap from '../components/TruckMap.vue'
</script>

<style scoped>
.terminals-dashboard {
  padding: 2rem;
  background-color: #f9fafb;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-box {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}
</style>
