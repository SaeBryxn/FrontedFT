// src/domains/supplier/dispatch/services/releasedOrdersService.js

import axios from 'axios'
import API from '@/services/api'
import { error as logError } from '@/services/logger'

/**
 * Obtiene todas las órdenes marcadas como 'Released'
 * @returns {Promise<Array>} Lista de órdenes despachadas
 */
export async function getReleasedOrders() {
    try {
        const res = await axios.get(`${API}/orders?status=Released`)
        return res.data
    } catch (error) {
        logError('Error al obtener órdenes Released:', error)
        return []
    }
}
