<template>
  <div id="workflow-map" class="workflow-map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Coordenadas simuladas
const coords = {
  lat: -12.0464,
  lng: -77.0428
}

onMounted(() => {
  const map = L.map('workflow-map').setView([coords.lat, coords.lng], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  const marker = L.marker([coords.lat, coords.lng]).addTo(map)
  marker.bindPopup('<strong>Pedido en ruta</strong><br>ETA: 25 min').openPopup()
})
</script>

<style scoped>
.workflow-map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
</style>
