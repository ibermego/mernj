class ShoppingCart {
    // LA COPIAMOS A FRONT-END
    constructor (currency) {
        this.items = [] // atributo privado
        this.currency = currency
    }

    getItemCount() {
        return this.items.length
    }

    addItem(item) {
        this.items.push(item) // no devolvemos, solo añadimos item
    }

    clearCart() {
        this.items = []
    }

    getItems() {
        return this.items
    }
}

module.exports = { ShoppingCart } //OJO ESTAMOS EN MODO COMMONJS, puede no valer en React que es MODULES