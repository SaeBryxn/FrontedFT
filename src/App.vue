<template>
  <LanguageToggle />
  <router-view />
</template>

<script>
import LanguageToggle from '@/components/shared/LanguageToggle.vue'

export default {
  name: 'App',
  components: { LanguageToggle }
}
</script>
