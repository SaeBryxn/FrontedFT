export default class DispatchOrder {
    constructor({ id, terminal, products }) {
        this.id = id
        this.terminal = terminal
        this.products = products || []
    }
}
