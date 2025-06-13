/**
 * Verifica si un valor es un precio válido positivo con hasta 2 decimales
 * @param {string|number} value
 * @returns {boolean}
 */
export function isValidPrice(value) {
    const num = parseFloat(value)
    return !isNaN(num) && num > 0 && /^\d+(\.\d{1,2})?$/.test(String(value))
}

/**
 * Formatea un número como precio en soles peruanos (PEN)
 * @param {number|string} value
 * @returns {string} Ej: S/ 8.00
 */
export function formatPrice(value) {
    const num = parseFloat(value)
    if (isNaN(num)) return 'S/ 0.00'

    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(num).replace('PEN', 'S/')
}
