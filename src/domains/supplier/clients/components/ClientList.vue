<template>
  <div class="client-list">
    <table>
      <thead>
      <tr>
        <th>Rank</th>
        <th>Client</th>
        <th>Fuel Volume</th>
        <th>Total Spent</th>
        <th>Last Order</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(client, index) in paginatedClients" :key="client.name">
        <td>
          <PhosphorIcon :name="getIcon(index)" :size="20" :class="['rank-icon', rankColor(index)]" />
        </td>
        <td>{{ client.name }}</td>
        <td>{{ client.volume.toLocaleString() }} gal</td>
        <td>{{ formatCurrency(client.total) }}</td>
        <td>{{ formatDate(client.lastOrder) }}</td>
        <td>
          <Button
              icon="pi pi-comments"
              label="Contact"
              @click="openChat(client)"
              class="p-button-sm p-button-info"
          />
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">←</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">→</button>
    </div>

    <!-- Chat Modal -->
    <Dialog v-model:visible="showChat" modal header="Client Chat" :style="{ width: '30rem' }">
      <div class="chat-box">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['chat-message', msg.from]"
        >
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input">
        <InputText
            v-model="newMessage"
            placeholder="Type your message..."
            class="w-full"
            @keyup.enter="sendMessage"
        />
        <Button icon="pi pi-send" @click="sendMessage" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PhosphorIcon from '@phosphor-icons/vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { formatCurrency, formatDate } from '../utils/clientUtils'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const page = ref(1)
const perPage = 5

const clientsSummary = computed(() => {
  const map = {}
  props.orders.forEach(order => {
    const name = order.user
    const total = parseFloat(order.amount.replace('S/', '').trim())
    const volume = order.products.reduce((sum, p) => sum + Number(p.quantity), 0)

    if (!map[name]) {
      map[name] = {
        name,
        volume,
        total,
        lastOrder: order.created
      }
    } else {
      map[name].volume += volume
      map[name].total += total
      map[name].lastOrder = new Date(order.created) > new Date(map[name].lastOrder)
          ? order.created
          : map[name].lastOrder
    }
  })
  return Object.values(map).sort((a, b) => b.total - a.total)
})

const totalPages = computed(() => Math.ceil(clientsSummary.value.length / perPage))
const paginatedClients = computed(() => {
  const start = (page.value - 1) * perPage
  return clientsSummary.value.slice(start, start + perPage)
})

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

function prevPage() {
  if (page.value > 1) page.value--
}

function getIcon(index) {
  return ['trophy', 'star', 'crown'][index] || 'user'
}

function rankColor(index) {
  return ['gold', 'silver', 'bronze'][index] || 'default'
}

// Chat logic
const showChat = ref(false)
const currentClient = ref(null)
const newMessage = ref('')
const messages = ref([])

function openChat(client) {
  currentClient.value = client
  // Aquí puedes cargar los mensajes reales si los tienes desde una API
  messages.value = [
    { from: 'client', text: 'Hola, necesito una nueva orden.' },
    { from: 'provider', text: 'Claro, ¿qué cantidad requiere?' }
  ]
  showChat.value = true
}

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({ from: 'provider', text: newMessage.value })
    newMessage.value = ''
  }
}
</script>

<style scoped>
.client-list {
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #1e3955;
}

th, td {
  padding: 1rem;
  text-align: left;
  font-size: 0.9rem;
  border-bottom: 1px solid #2c445f;
}

td {
  color: #e2e8f0;
}

.rank-icon {
  vertical-align: middle;
}

.gold {
  color: #facc15;
}

.silver {
  color: #cbd5e1;
}

.bronze {
  color: #d97706;
}

.default {
  color: #64748b;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.pagination button {
  background: none;
  border: 1px solid #334155;
  color: #22c55e;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Chat modal styles */
.chat-box {
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: #0f172a;
  border-radius: 8px;
}

.chat-message {
  margin: 0.3rem 0;
  padding: 0.5rem 0.7rem;
  border-radius: 6px;
  font-size: 0.85rem;
  max-width: 80%;
}

.chat-message.client {
  background-color: #334155;
  align-self: flex-start;
  color: #fff;
}

.chat-message.provider {
  background-color: #22c55e;
  align-self: flex-end;
  color: #000;
  margin-left: auto;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
