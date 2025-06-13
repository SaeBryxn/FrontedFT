<template>
  <div class="rating-card">
    <h3><i class="ph ph-building"></i> {{ provider.company }}</h3>
    <p><i class="ph ph-identification-card"></i> RUC: {{ provider.ruc }}</p>
    <p><i class="ph ph-star"></i> Rating: {{ provider.rating }} / 5</p>
  </div>
</template>

<script setup>
defineProps({
  provider: Object
})
</script>

<style scoped>
.rating-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-size: 0.9rem;
  color: #1e293b;
}
.rating-card i {
  margin-right: 0.4rem;
  color: #0ea5e9;
}
.rating-card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
