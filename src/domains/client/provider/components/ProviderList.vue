<template>
  <div class="grid gap-4">
    <Card
        v-for="provider in providers"
        :key="provider.id"
        class="shadow-2 border-round-xl surface-card p-3"
    >
      <template #title>
        <div class="flex items-center gap-2">
          <Avatar
              icon="pi pi-briefcase"
              class="bg-primary-100 text-primary"
              shape="circle"
          />
          <span class="font-semibold text-lg text-color">{{ provider.name }}</span>
        </div>
      </template>

      <template #content>
        <div class="text-sm text-color-secondary mb-3">
          <p><strong>RUC:</strong> {{ provider.ruc }}</p>
          <p><strong>Email:</strong> {{ provider.email }}</p>
          <p><strong>Combustibles:</strong> {{ provider.fuels.join(', ') }}</p>
          <p><strong>Terminales:</strong> {{ provider.terminals.join(', ') }}</p>
        </div>
        <Button
            icon="pi pi-comments"
            label="Contactar"
            class="p-button-sm p-button-info"
            @click="openChat(provider)"
        />
      </template>
    </Card>

    <!-- Chat Modal -->
    <Dialog v-model:visible="showChat" modal header="Chat con Proveedor" :style="{ width: '30rem' }">
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
            placeholder="Escribe tu mensaje..."
            class="w-full"
            @keyup.enter="sendMessage"
        />
        <Button icon="pi pi-send" @click="sendMessage" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'

import { getProviders } from '../services/providerService.js'

const providers = ref([])

onMounted(async () => {
  providers.value = await getProviders()
})

// Chat logic
const showChat = ref(false)
const currentProvider = ref(null)
const newMessage = ref('')
const messages = ref([])

function openChat(provider) {
  currentProvider.value = provider
  messages.value = [
    { from: 'client', text: 'Hola, me interesa tu servicio.' },
    { from: 'provider', text: 'Hola, con gusto te ayudo. ¿Qué necesitas?' }
  ]
  showChat.value = true
}

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({ from: 'client', text: newMessage.value })
    newMessage.value = ''
  }
}
</script>

<style scoped>
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
  background-color: #22c55e;
  align-self: flex-end;
  color: #000;
  margin-left: auto;
}

.chat-message.provider {
  background-color: #334155;
  align-self: flex-start;
  color: #fff;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
</style>
