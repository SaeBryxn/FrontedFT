<!-- src/pages/WelcomePage.vue -->
<template>
  <div class="welcome-container">
    <h1 class="title">{{ $t('welcome.title') }}</h1>
    <p class="subtitle">{{ $t('welcome.subtitle') }}</p>

    <div class="card-group">
      <div class="card" @click="goTo('/login-client')">
        <i class="ph ph-user"></i>
        <h2>{{ $t('welcome.client_title') }}</h2>
        <p>{{ $t('welcome.client_desc') }}</p>
      </div>
      <div class="card" @click="goTo('/login-supplier')">
        <i class="ph ph-briefcase"></i>
        <h2>{{ $t('welcome.supplier_title') }}</h2>
        <p>{{ $t('welcome.supplier_desc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 100vh;
  background-color: #f9fafb;
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.card-group {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  width: 240px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.card i {
  font-size: 2.5rem;
  color: #0ea5e9;
  margin-bottom: 1rem;
}

.card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
