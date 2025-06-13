// src/domains/supplier/conciliations/services/conciliationService.js

import axios from 'axios'
import API from '@/services/api'
import ConciliationOrder from '../models/ConciliationOrder'
import { log, error as logError } from '@/services/logger'

const ORDERS_URL = `${API}/orders`

/**
 * Obtener todas las órdenes desde la API y mapearlas a instancias de ConciliationOrder
 * @returns {Promise<ConciliationOrder[]>}
 */
export async function getConciliations() {
    try {
        const response = await axios.get(ORDERS_URL)
        return response.data.map(order => new ConciliationOrder(order))
    } catch (error) {
        logError('[ConciliationService] Error al obtener órdenes:', error.message)
        return []
    }
}

/**
 * Actualizar una orden como aprobada
 * @param {number} orderId - ID único de la orden a aprobar
 * @returns {Promise<object>} - Orden actualizada desde la API
 */
export async function approveOrder(orderId) {
    if (!orderId) {
        log('[ConciliationService] orderId inválido')
        return
    }

    try {
        const response = await axios.patch(`${ORDERS_URL}/${orderId}`, {
            approved: true,
            status: 'Approved'
        })
        return response.data
    } catch (error) {
        logError(`[ConciliationService] Error al aprobar la orden ${orderId}:`, error.message)
        throw error
    }
}
