<template>
  <div class="details-wrapper">
    <DataTable
        :value="products"
        responsiveLayout="scroll"
        class="p-datatable-sm"
    >
      <Column field="product" header="Product" />
      <Column field="quantity" header="Quantity" />
      <Column field="unit" header="Unit" />
      <Column field="price" header="Price" />
      <Column field="total" header="Total Amount" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: {
    product: string
    quantity: number
    unit: string
    price: string
    total: string
  }[]
}>()
</script>

<style scoped>
.details-wrapper {
  background-color: var(--surface-card);
  color: var(--text-color);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
