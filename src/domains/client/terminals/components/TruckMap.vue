<template>
  <div id="map" class="truck-map" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-ant-path'
import { getTrucks } from '../services/terminalService.js'

const trucks = ref([])

onMounted(async () => {
  trucks.value = await getTrucks()

  const map = L.map('map').setView([-12.0464, -77.0428], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  const truckIcon = L.icon({
    iconUrl: '/icons/truck-marker.svg', // Asegúrate de tener este ícono en public/icons
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })

  function getColorByStatus(status) {
    return {
      Requested: '#facc15',
      Approved: '#22c55e',
      Released: '#0ea5e9',
      Closed: '#64748b'
    }[status] || '#6b7280'
  }

  trucks.value.forEach(truck => {
    const origin = truck.originCoords || [-12.0611, -77.1188]
    const route = [origin, [truck.lat, truck.lng]]

    L.polyline.antPath(route, {
      delay: 800,
      dashArray: [10, 20],
      weight: 4,
      color: getColorByStatus(truck.status),
      pulseColor: '#a5f3fc'
    }).addTo(map)

    const marker = L.marker([truck.lat, truck.lng], { icon: truckIcon }).addTo(map)
    marker.bindPopup(`
      <strong>${truck.driver}</strong><br/>
      ${truck.plate}<br/>
      ${truck.fuel} - ${truck.quantity} gal<br/>
      Estado: ${truck.status}
    `)
  })
})
</script>

<style scoped>
.truck-map {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-2);
}
</style>
