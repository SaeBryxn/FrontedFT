import { defineStore } from 'pinia'
import { getOrders, createOrder } from '../services/orderService.js'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as any[],
    isLoading: false
  }),
  actions: {
    async fetchOrders() {
      this.isLoading = true
      try {
        this.orders = await getOrders()
      } finally {
        this.isLoading = false
      }
    },
    async addOrder(order: any) {
      const newOrder = await createOrder(order)
      this.orders.push(newOrder)
    }
  }
})

export type OrdersStore = ReturnType<typeof useOrdersStore>
