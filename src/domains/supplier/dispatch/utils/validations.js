export function validateTransportAssignment(truck, driver, tank) {
    return !!(truck && driver && tank)
}

export function validateCompartments(productList) {
    return productList.every(p => p.truck && p.driver && p.tank)
}
