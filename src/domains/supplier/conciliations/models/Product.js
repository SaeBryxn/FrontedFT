import Payment from './Payment'

export default class Product {
    constructor(data = {}) {
        this.product = data.product || '—'
        this.quantity = data.quantity || 0
        this.unit = data.unit || '—'
        this.price = this.parseAmount(data.price)
        this.total = this.parseAmount(data.total)
        this.payments = (data.payments || []).map(p => new Payment(p))
    }

    parseAmount(value) {
        if (!value) return 0
        if (typeof value === 'number') return value
        const clean = value.replace(/[^\d.]/g, '')
        return parseFloat(clean)
    }
}
