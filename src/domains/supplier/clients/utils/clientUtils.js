/**
 * Formatea un número como moneda peruana
 * @param {number|string} value
 * @returns {string}
 */
export function formatCurrency(value) {
    const num = parseFloat(value)
    if (isNaN(num)) return 'S/ 0.00'
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(num).replace('PEN', 'S/')
}

/**
 * Formatea una fecha YYYY-MM-DD a formato corto
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    return new Date(dateStr).toLocaleDateString('en-US', options)
}
