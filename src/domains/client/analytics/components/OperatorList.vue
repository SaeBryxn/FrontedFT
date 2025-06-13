<template>
  <div class="operator-list flex flex-column gap-4">
    <!-- 🔍 Search + Sort (alineados correctamente) -->
    <div class="operator-controls">
      <!-- Buscar -->
      <div class="input-group">
        <InputText
            v-model="filter"
            placeholder="Buscar operador..."
            class="p-inputtext-sm"
        />
        <Button
            v-if="filter"
            icon="pi pi-times"
            @click="filter = ''"
            text
            rounded
            aria-label="Limpiar"
        />
      </div>

      <!-- Ordenar -->
      <div class="input-group">
        <Dropdown
            v-model="sortBy"
            :options="sortOptions"
            optionLabel="label"
            optionValue="value"
            filter
            showClear
            class="p-inputtext-sm"
            placeholder="Ordenar por"
        />
      </div>
    </div>

    <!-- 📦 Vista tipo mosaico -->
    <div v-if="filteredOperators.length" class="operator-grid">
      <Card v-for="op in paginatedOperators" :key="op.name" class="operator-tile">
        <template #content>
          <div class="flex items-center gap-3">
            <Avatar icon="pi pi-user" shape="circle" class="bg-primary text-white" size="large" />
            <div class="flex-1">
              <div class="text-lg font-semibold text-color">{{ op.name }}</div>
              <Tag :value="`${op.count} órdenes`" :severity="badgeSeverity(op.count)" rounded />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- 😔 Sin resultados -->
    <div v-else class="empty-msg">
      <i class="pi pi-user-minus text-xl text-gray-500" />
      <span>No hay operadores encontrados.</span>
    </div>

    <!-- 📄 Paginador -->
    <Paginator
        v-if="filteredOperators.length > perPage"
        :rows="perPage"
        :totalRecords="filteredOperators.length"
        :first="first"
        @update:first="first = $event"
        template="PrevPageLink PageLinks NextPageLink"
        class="mt-3"
    />
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

const filter = ref('')
const sortBy = ref('count')
const first = ref(0)
const perPage = 9

const sortOptions = [
  { label: 'Cantidad de órdenes', value: 'count' },
  { label: 'Nombre A-Z', value: 'name' }
]

const topOperators = computed(() => {
  const map = new Map()
  for (const o of props.orders) {
    if (!o.user) continue
    map.set(o.user, (map.get(o.user) || 0) + 1)
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }))
})

const filteredOperators = computed(() => {
  const filtered = topOperators.value.filter(op =>
      op.name.toLowerCase().includes(filter.value.toLowerCase())
  )
  if (sortBy.value === 'name') {
    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }
  return filtered.sort((a, b) => b.count - a.count)
})

const paginatedOperators = computed(() => {
  return filteredOperators.value.slice(first.value, first.value + perPage)
})

function badgeSeverity(count) {
  if (count >= 20) return 'success'
  if (count >= 10) return 'warning'
  return 'info'
}
</script>

<style scoped>
.operator-list {
  padding: 0.5rem 0;
}

.operator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.operator-tile {
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
  padding: 1rem;
  transition: box-shadow 0.2s;
  background: var(--surface-card);
}

.operator-tile:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.empty-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px dashed var(--surface-border);
  border-radius: 8px;
  color: var(--text-color-secondary);
  background: var(--surface-50);
  font-size: 0.95rem;
  justify-content: center;
}
.operator-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .operator-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.input-group input,
.input-group .p-dropdown {
  width: 100%;
}

</style>
