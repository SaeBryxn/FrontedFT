// src/domains/provider/orders/services/orderService.js

import axios from 'axios'
import API from '@/services/api'
import { error as logError } from '@/services/logger'

const API_URL = `${API}/orders`

/**
 * Obtener y procesar órdenes desde fake API
 * @returns {Promise<Array>}
 */
export async function getOrders() {
    try {
        const response = await axios.get(API_URL)
        return response.data.map(order => ({
            id: order.id,
            created: order.created,
            user: order.user || '—',
            terminal: order.terminal || '—',
            amount: parseAmount(order.amount),
            orderId: order.orderId,
            status: order.status,
            products: order.products || []
        }))
    } catch (error) {
        logError('Error al obtener órdenes:', error)
        return []
    }
}

/**
 * Extrae número de monto desde string tipo "S/ 5200.00"
 * @param {string} amountStr
 * @returns {number}
 */
function parseAmount(amountStr) {
    if (!amountStr) return 0
    const numeric = amountStr.replace(/[^\d.]/g, '')
    return parseFloat(numeric)
}

/**
 * Devuelve las órdenes junto con un resumen por estado
 * @returns {Promise<{orders: Array, statuses: Array}>}
 */
export async function getOrdersWithStatusCount() {
    try {
        const response = await axios.get(API_URL)
        const orders = response.data

        const counts = orders.reduce((acc, order) => {
            const status = order.status || 'Unknown'
            acc[status] = (acc[status] || 0) + 1
            return acc
        }, {})

        const uniqueStatuses = Object.entries(counts).map(([status, count]) => ({
            label: status,
            value: status,
            count
        }))

        return {
            orders,
            statuses: uniqueStatuses
        }
    } catch (error) {
        logError('Error al obtener órdenes:', error)
        return { orders: [], statuses: [] }
    }
}
