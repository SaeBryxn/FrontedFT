// src/domains/client/orders/services/orderService.js

import axios from 'axios'
import API from '@/services/api' // ✅ Importar la base común
import { error as logError } from '@/services/logger'

const API_URL = `${API}/orders`

/**
 * Obtener todas las órdenes desde la API
 * @returns {Promise<Array>} Lista de órdenes
 */
export async function getOrders() {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        logError('Error al obtener órdenes:', error)
        return []
    }
}

/**
 * Crear una nueva orden en la API
 * @param {Object} order - Objeto de orden a registrar
 * @returns {Promise<void>}
 */
export async function createOrder(order) {
    try {
        // 🛠️ Forzar que el id sea string
        const payload = {
            ...order,
            id: String(order.id || Date.now()) // genera o transforma a string
        }

        const res = await axios.post(API_URL, payload)
        return res.data
    } catch (error) {
        logError('Error creando orden:', error)
        throw error
    }
}
