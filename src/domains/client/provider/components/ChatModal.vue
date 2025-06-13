<template>
  <Dialog
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      modal
      class="w-full md:w-30rem"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <Avatar
            icon="pi pi-user"
            shape="circle"
            class="bg-primary text-white"
            size="large"
        />
        <div class="flex flex-column">
          <span class="text-base font-semibold text-primary">
            {{ provider?.company || 'Proveedor' }}
          </span>
          <small class="text-500">Soporte en línea</small>
        </div>
      </div>
    </template>

    <div class="chat-box flex flex-column justify-between">
      <!-- Mensajes -->
      <div ref="scrollRef" class="messages px-2 py-2 flex-1 overflow-auto">
        <ChatBubble
            v-for="(msg, index) in messages"
            :key="index"
            :message="msg.text"
            :isMine="msg.mine"
            :time="msg.time"
            :status="msg.status"
        />
        <div v-if="!messages.length" class="text-center text-sm text-500 mt-3">
          No hay mensajes aún.
        </div>
      </div>

      <!-- Input -->
      <div class="flex gap-2 border-top p-2">
        <InputText
            v-model="newMessage"
            placeholder="Escribe un mensaje..."
            class="flex-1"
            @keyup.enter="sendMessage"
        />
        <Button
            icon="pi pi-send"
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            severity="success"
            rounded
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import ChatBubble from './ChatBubble.vue'

const props = defineProps({
  visible: Boolean,
  provider: Object
})
const emit = defineEmits(['update:visible'])

const newMessage = ref('')
const messages = ref([])
const scrollRef = ref(null)

function sendMessage() {
  const msg = newMessage.value.trim()
  if (!msg) return

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  messages.value.push({
    text: msg,
    mine: true,
    time,
    status: 'Enviado'
  })

  newMessage.value = ''
  scrollToBottom()

  setTimeout(() => {
    messages.value.push({
      text: 'Gracias por tu mensaje, pronto responderemos.',
      mine: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  }, 800)
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTop = scrollRef.value.scrollHeight
    }
  })
}

watch(() => props.visible, (val) => {
  if (!val) {
    messages.value = []
    newMessage.value = ''
  } else {
    scrollToBottom()
  }
})
</script>

<style scoped>
.chat-box {
  max-height: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.messages {
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  scroll-behavior: smooth;
}

.border-top {
  border-top: 1px solid var(--surface-border);
}
</style>
