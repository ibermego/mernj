function getSaldo() {
    return 1000
    // return -1000
}

function tieneSaldo(saldo, minimo) {
    if (saldo >= minimo)
        return true
    return false
}

module.exports = { getSaldo, tieneSaldo }; // porque es commonjs,  sino export default en caso de module