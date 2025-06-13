// src/domains/client/dispatch/services/dispatchService.js

import axios from 'axios'
import API from '@/services/api'
import { log, error as logError } from '@/services/logger'

// Obtener órdenes aprobadas
export async function getApprovedOrders() {
    try {
        const res = await axios.get(`${API}/orders?status=Approved`)
        return res.data
    } catch (error) {
        logError('Error al obtener órdenes aprobadas:', error)
        return []
    }
}

// Obtener camiones disponibles
export async function getTrucks() {
    try {
        const res = await axios.get(`${API}/trucks`)
        return res.data
    } catch (error) {
        logError('Error al obtener camiones:', error)
        return []
    }
}

// Obtener conductores disponibles
export async function getDrivers() {
    try {
        const res = await axios.get(`${API}/drivers`)
        return res.data
    } catch (error) {
        logError('Error al obtener conductores:', error)
        return []
    }
}

// Obtener cisternas disponibles
export async function getTanks() {
    try {
        const res = await axios.get(`${API}/tanks`)
        return res.data
    } catch (error) {
        logError('Error al obtener cisternas:', error)
        return []
    }
}

// Marcar orden como 'Released' (sin tocar productos)
export async function markAsReleased(orderId) {
    try {
        const res = await axios.patch(`${API}/orders/${orderId}`, {
            status: 'Released'
        })
        return res.data
    } catch (error) {
        logError('Error al marcar orden como Released:', error)
        throw error
    }
}

// Asignar transporte a una orden
export async function assignTransportToOrder(orderId, transport) {
    try {
        log('>>> dispatchService.assignTransportToOrder payload:', orderId, transport)
        const res = await axios.patch(`${API}/orders/${orderId}`, {
            status: 'Released',
            transport: transport
        })
        log('<<< Response assignTransportToOrder:', res.data)
        return res.data
    } catch (error) {
        logError('Error al asignar transporte a la orden:', error.response ?? error)
        throw error
    }
}
