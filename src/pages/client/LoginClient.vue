<template>
  <div class="login-wrapper" :class="{ 'fade-out': fadingOut }">
    <div class="background-blur"></div>

    <!-- Spinner mientras carga -->
    <div class="spinner-wrapper" v-if="loading">
      <i class="pi pi-spin pi-spinner loading-icon"></i>
      <p class="loading-text">Ingresando...</p>
    </div>

    <!-- Card principal -->
    <div class="login-card" v-else>
      <div class="logo-container">
        <img src="/img/logoWhite.png" alt="Logo" class="logo-img" />
      </div>

      <h1 class="login-title">FuelTrack</h1>
      <p class="login-subtitle">{{ $t('login.client.subtitle') }}</p>

      <form @submit.prevent="handleLogin">
        <IconField class="field">
          <InputIcon class="pi pi-envelope icon" />
          <InputText
              type="email"
              v-model="email"
              :placeholder="$t('common.email')"
              required
              class="input"
          />
        </IconField>

        <IconField class="field">
          <InputIcon class="pi pi-lock icon" />
          <InputText
              type="password"
              v-model="password"
              :placeholder="$t('common.password')"
              required
              class="input"
          />
        </IconField>

        <Button type="submit" :label="$t('login.client.submit')" class="btn" />
      </form>

      <a class="forgot">{{ $t('login.client.forgot_password') }}</a>
    </div>
  </div>
</template>

<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const email = ref('')
const password = ref('')
const loading = ref(false)
const fadingOut = ref(false)
const router = useRouter()
const { t } = useI18n()

function handleLogin() {
  loading.value = true
  setTimeout(() => {
    fadingOut.value = true
    setTimeout(() => {
      router.push('/client/orders')
    }, 500) // espera fade-out
  }, 1500) // spinner delay
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  animation: fadeIn 0.5s ease;
}

.background-blur {
  position: absolute;
  inset: 0;
  background-image: url('/img/background.png');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  z-index: -1;
}

.fade-out {
  animation: fadeOut 0.6s forwards ease;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-img {
  width: 110px;
  height: auto;
  filter: brightness(0) invert(1);
  transition: transform 0.2s ease;
  margin-bottom: 0.5rem;
}

.logo-img:hover {
  transform: scale(1.05);
}

.login-title {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0.2rem 0 0.2rem;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.field {
  margin-bottom: 1.2rem;
}

.icon {
  color: rgba(255, 255, 255, 0.7);
}

.input {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 0.8rem 1rem;
  color: white;
  width: 100%;
  font-size: 0.95rem;
  transition: border 0.2s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: background 0.2s, transform 0.2s;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

.forgot {
  display: block;
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  font-size: 1.2rem;
  gap: 1rem;
  animation: fadeIn 0.4s ease-in;
}

.loading-icon {
  font-size: 3rem;
  color: #ffffffcc;
}

.loading-text {
  color: #ffffffcc;
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: scale(0.97);
  }
}
</style>
