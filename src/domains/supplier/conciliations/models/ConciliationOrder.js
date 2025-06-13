import Product from './Product'

export default class ConciliationOrder {
    constructor(data = {}) {
        this.id = data.id
        this.created = data.created
        this.user = data.user || '—'
        this.terminal = data.terminal || '—'
        this.amount = this.parseAmount(data.amount)
        this.orderId = data.orderId
        this.status = data.status || 'Requested'
        this.products = (data.products || []).map(p => new Product(p))
        this.approved = data.approved === true
    }

    parseAmount(value) {
        if (!value) return 0
        if (typeof value === 'number') return value
        const clean = value.replace(/[^\d.]/g, '')
        return parseFloat(clean)
    }
}
