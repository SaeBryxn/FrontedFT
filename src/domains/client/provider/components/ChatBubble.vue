<template>
  <div
      class="chat-bubble"
      :class="{ 'mine': isMine, 'theirs': !isMine }"
  >
    <!-- Nombre solo para mensajes que no son míos -->
    <div v-if="!isMine && sender" class="sender-name">{{ sender }}</div>

    <!-- Mensaje principal -->
    <div class="bubble-text">
      {{ message }}
    </div>

    <!-- Meta: hora + estado -->
    <div class="meta">
      <span class="time">{{ time }}</span>
      <span v-if="isMine && status" class="status">{{ status }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  isMine: Boolean,
  sender: String,      // 👤 opcional (solo para terceros)
  time: String,        // 🕒 string tipo "14:36"
  status: String       // ✅ opcional: "Enviado", "Visto", etc.
})
</script>

<style scoped>
.chat-bubble {
  max-width: 80%;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  border-radius: 1.25rem;
  word-break: break-word;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease;
  margin: 0.25rem 0;
  position: relative;
}

.mine {
  align-self: flex-end;
  background-color: var(--primary-100);
  color: var(--primary-color-text);
  border-bottom-right-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.15);
  text-align: right;
}

.theirs {
  align-self: flex-start;
  background-color: var(--surface-200);
  color: var(--text-color);
  border-bottom-left-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(107, 114, 128, 0.1);
}

.sender-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-color-secondary);
  margin-bottom: 0.2rem;
}

.meta {
  font-size: 0.7rem;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

.bubble-text {
  font-weight: 400;
}

/* Animación suave */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
