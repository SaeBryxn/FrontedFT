/**
 * Agrupa los elementos por una clave dada y aplica una función agregadora.
 * @param {Array} data - Lista de elementos
 * @param {Function} groupBy - Función que devuelve la clave de agrupamiento
 * @param {Function} reducer - Función de agregación
 * @param {*} initial - Valor inicial del acumulador
 * @returns {Object} Objeto agrupado y reducido
 */
export function groupAndReduce(data, groupBy, reducer, initial) {
    return data.reduce((acc, item) => {
        const key = groupBy(item)
        acc[key] = reducer(acc[key] || initial, item)
        return acc
    }, {})
}

/**
 * Formatea una fecha YYYY-MM-DD a formato legible corto
 * @param {string} dateStr
 * @returns {string} Ejemplo: 2025-05-12 → 12 May
 */
export function formatShortDate(dateStr) {
    const options = { day: '2-digit', month: 'short' }
    return new Date(dateStr).toLocaleDateString('en-US', options)
}

/**
 * Agrupa volumen por tipo de combustible
 * @param {Array} orders
 * @returns {Object} Ej: { "Diesel B5": 3400, "GLP": 2000 }
 */
export function volumeByFuel(orders) {
    return groupAndReduce(
        orders.flatMap(order => order.products),
        p => p.product,
        (sum, p) => sum + Number(p.quantity),
        0
    )
}

/**
 * Agrupa volumen por terminal
 * @param {Array} orders
 * @returns {Object} Ej: { "Callao": 8000, "Pisco": 1200 }
 */
export function volumeByTerminal(orders) {
    return groupAndReduce(
        orders,
        o => o.terminal,
        (sum, o) => sum + o.products.reduce((s, p) => s + Number(p.quantity), 0),
        0
    )
}
