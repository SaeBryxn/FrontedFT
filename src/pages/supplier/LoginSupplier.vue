<template>
  <div class="login-wrapper" :class="{ 'fade-out': fadingOut }">
    <div class="background-blur"></div>

    <div class="spinner-wrapper" v-if="loading">
      <i class="pi pi-spin pi-spinner loading-icon"></i>
      <p class="loading-text">Ingresando...</p>
    </div>

    <div class="login-card" v-else>
      <div class="logo-container">
        <img src="/img/logo.png" alt="FuelTrack Logo" class="logo-img" />
      </div>

      <h1 class="login-title">FuelTrack</h1>
      <p class="login-subtitle">{{ $t('login.supplier.subtitle') }}</p>

      <form @submit.prevent="handleLogin">
        <input
            type="text"
            v-model="ruc"
            :placeholder="$t('common.ruc')"
            required
            aria-label="RUC"
            class="input"
        />

        <input
            type="email"
            v-model="email"
            :placeholder="$t('common.email')"
            required
            aria-label="Email Address"
            class="input"
        />

        <input
            type="password"
            v-model="password"
            :placeholder="$t('common.password')"
            required
            aria-label="Password"
            class="input"
        />

        <button type="submit" class="btn">
          {{ $t('login.supplier.submit') }}
        </button>
      </form>

      <p class="register-text">
        {{ $t('login.supplier.not_supplier') }}
        <router-link to="/register-supplier" class="register-link">
          {{ $t('common.click_here') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginSupplier',
  data() {
    return {
      ruc: '',
      email: '',
      password: '',
      loading: false,
      fadingOut: false
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      setTimeout(() => {
        this.fadingOut = true
        setTimeout(() => {
          this.$router.push('/supplier')
        }, 500)
      }, 1500)
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease;
}

.background-blur {
  position: absolute;
  inset: 0;
  background-image: url('/img/background.png'); /* usa tu fondo */
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  z-index: -1;
}

.fade-out {
  animation: fadeOut 0.6s forwards ease;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  gap: 1rem;
  min-height: 100vh;
  justify-content: center;
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

.input {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 0.8rem 1rem;
  color: white;
  width: 100%;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  transition: border 0.2s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input:focus {
  border-color: rgba(255, 255, 255, 0.4);
  outline: none;
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
  transition: background 0.2s, transform 0.2s;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.02);
}

.register-text {
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
}

.register-link {
  text-decoration: underline;
  color: #ffffff;
  font-weight: 500;
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
