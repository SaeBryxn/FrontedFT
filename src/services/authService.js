// src/domains/shared/services/authService.js

import axios from 'axios'
import API_BASE from './api'
import { error as logError } from '@/services/logger'

const API_URL = API_BASE

/**
 * Realiza el login de un cliente a través del email y password.
 * @param {string} email - Correo electrónico del cliente.
 * @param {string} password - Contraseña del cliente.
 * @returns {Promise<{ success: boolean, user?: object, message?: string }>}
 */
export async function loginClient(email, password) {
    try {
        const { data } = await axios.get(`${API_URL}/clients`, {
            params: { email, password }
        });

        if (data.length > 0) {
            return { success: true, user: data[0] };
        }

        return { success: false, message: 'Credenciales inválidas para cliente.' };
    } catch (error) {
        logError('[loginClient] Error:', error);
        return { success: false, message: 'Error del servidor.' };
    }
}

/**
 * Login para proveedores
 * @param {string} ruc
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, user?: object, message?: string }>}
 */
export async function loginSupplier(ruc, email, password) {
    try {
        const response = await axios.get(`${API_URL}/suppliers`, {
            params: { ruc, email, password }
        })

        if (response.data.length > 0) {
            return { success: true, user: response.data[0] }
        }

        return { success: false, message: 'Credenciales inválidas para proveedor.' }
    } catch (error) {
        logError('Error en loginSupplier:', error)
        return { success: false, message: 'Error del servidor.' }
    }
}
