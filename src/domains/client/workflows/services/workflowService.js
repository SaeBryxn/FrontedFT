// src/domains/client/workflows/services/workflowService.js

import axios from 'axios'
import API from '@/services/api'
import { error as logError } from '@/services/logger'

/**
 * Obtiene todas las órdenes registradas (con productos y estados).
 * Estas se usarán para simular los workflows de cada orden.
 * @returns {Promise<Array>} Lista de órdenes
 */
export async function getWorkflows() {
    try {
        const response = await axios.get(`${API}/orders`)
        return response.data
    } catch (error) {
        logError('❌ Error al obtener workflows:', error)
        return []
    }
}

/**
 * Devuelve los estados posibles del flujo en orden lógico.
 * Este helper es útil para simular progresos.
 */
export function getWorkflowSteps() {
    return ['Requested', 'Approved', 'Released', 'Closed']
}
