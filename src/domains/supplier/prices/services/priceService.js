// src/domains/provider/prices/services/fuelPriceService.js

import axios from 'axios'
import API from '@/services/api'
import { error as logError } from '@/services/logger'

const API_URL = API

/**
 * Obtiene los combustibles disponibles para un proveedor según su RUC
 * @param {string} ruc
 * @returns {Promise<Array>} Lista de objetos fuel (type, pricePerGal)
 */
export async function getProviderFuels(ruc) {
    try {
        // Obtener proveedor
        const providerRes = await axios.get(`${API_URL}/providers?ruc=${ruc}`)
        const provider = providerRes.data[0]

        if (!provider) return []

        const fuelTypes = provider.fuels

        // Obtener todos los combustibles
        const fuelsRes = await axios.get(`${API_URL}/fuels`)
        const allFuels = fuelsRes.data

        // Filtrar solo los que ofrece este proveedor
        return allFuels.filter(f => fuelTypes.includes(f.type))
    } catch (error) {
        logError('❌ Error getting provider fuels:', error)
        return []
    }
}

/**
 * Actualiza el precio por galón de un combustible
 * @param {number|string} fuelId
 * @param {number|string} newPrice
 * @returns {Promise<object|boolean>}
 */
export async function updateFuelPrice(fuelId, newPrice) {
    try {
        const parsed = parseFloat(newPrice)
        if (isNaN(parsed)) throw new Error('Invalid price')

        const formatted = `S/ ${parsed.toFixed(2)}`

        const res = await axios.patch(`${API_URL}/fuels/${fuelId}`, {
            pricePerGal: formatted
        })

        return res.data
    } catch (error) {
        logError('❌ Error updating fuel price:', error)
        return false
    }
}
