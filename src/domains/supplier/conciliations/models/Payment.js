export default class Payment {
    constructor(data = {}) {
        this.bank = data.bank || '—'
        this.amount = this.parseAmount(data.amount)
        this.date = data.date || null
        this.operation = data.operation || ''
        this.validated = data.validated === true
    }

    parseAmount(value) {
        if (!value) return 0
        if (typeof value === 'number') return value
        const clean = value.replace(/[^\d.]/g, '')
        return parseFloat(clean)
    }
}
