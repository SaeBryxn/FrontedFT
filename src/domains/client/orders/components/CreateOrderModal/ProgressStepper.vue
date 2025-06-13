<template>
  <nav class="progress-container" aria-label="Flujo de pasos">
    <ol class="progress-steps">
      <li
          v-for="(step, index) in stepsToUse"
          :key="index"
          class="step"
          :class="{
          active: currentStep === index + 1,
          completed: step.status === 'completed',
          failed: step.status === 'failed'
        }"
          :aria-current="currentStep === index + 1 ? 'step' : null"
      >
        <div class="step-wrapper">
          <div class="circle" :title="step.label">
            <Transition name="fade-scale" mode="out-in">
              <i
                  v-if="step.status === 'completed'"
                  class="pi pi-check"
                  key="check"
              />
              <i
                  v-else-if="step.status === 'failed'"
                  class="pi pi-times-circle"
                  key="fail"
              />
              <i
                  v-else
                  :class="step.icon || 'pi pi-circle'"
                  key="icon"
              />
            </Transition>
          </div>
          <span class="label">{{ step.label }}</span>
        </div>

        <div v-if="index < stepsToUse.length - 1" class="line-wrapper">
          <div class="line" :class="{ filled: step.status === 'completed' }" />
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number
  steps?: {
    label: string
    icon?: string
    status?: 'completed' | 'failed' | 'pending'
  }[]
}>()

const defaultSteps = [
  { label: 'Orden', icon: 'pi pi-pencil', status: 'pending' },
  { label: 'Pago', icon: 'pi pi-credit-card', status: 'pending' },
  { label: 'Confirmar', icon: 'pi pi-check-circle', status: 'pending' }
]

const stepsToUse = computed(() => props.steps ?? defaultSteps)
</script>

<style scoped>
.progress-container {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.progress-steps {
  display: flex;
  width: 100%;
  max-width: 880px;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #6b7280;
  background-color: transparent;
  transition: all 0.3s ease, transform 0.2s ease;
}

.step.active .circle {
  border-color: #0ea5e9;
  color: #0ea5e9;
  background-color: #e0f2fe;
  transform: scale(1.1);
}

.step.completed .circle {
  border-color: #10b981;
  color: #10b981;
  background-color: #ecfdf5;
  animation: bounceIn 0.35s ease-out;
}

.step.failed .circle {
  border-color: #ef4444;
  color: #ef4444;
  background-color: #fef2f2;
  animation: shake 0.3s ease-in-out;
}

.label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.3s;
}

.step.active .label {
  color: #0ea5e9;
  font-weight: 600;
}

.step.completed .label {
  color: #10b981;
}

.step.failed .label {
  color: #ef4444;
}

.line-wrapper {
  position: absolute;
  top: 21px;
  left: 50%;
  width: 100%;
  height: 2px;
  transform: translateX(50%);
  z-index: -1;
}

.line {
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
  transition: background-color 0.3s ease;
}

.line.filled {
  background-color: #10b981;
}

/* Animación de entrada elegante */
.fade-scale-enter-active {
  animation: fadeScaleIn 0.3s ease-out;
}
.fade-scale-leave-active {
  opacity: 0;
}
@keyframes fadeScaleIn {
  0% {
    opacity: 0;
    transform: scale(0.75) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Rebote suave para completado */
@keyframes bounceIn {
  0% {
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Agitación para fallo */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .label {
    display: none;
  }

  .circle {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
