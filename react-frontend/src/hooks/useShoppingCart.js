import { useState } from "react"
// la clase ShoppingCart deja de existir para convertirse en un Hook
// ESTO ES UN HOOK, nombre SIEMPRE empieza por "use"
// PURO JAVASCRIPT POR ESO EL .JS
// HACEMOS LO MSMO QUE LA CLASE PERO CON JAVASCRIPT
// no devolmemos html devolvemos funciones o datos

const useShoppingCart = (currency = "Euros") => {

    const [items, setItems] = useState([])

    const addItem = (newItem) => {
        setItems (prevItems => [...prevItems, newItem])

    }

    const clearCart = () => {
        setItems([])
    }


    // OJO NO VA ENTRE PARENTESIS !!!
    return { 
        items, addItem, clearCart // exportamos los elementos necesarios
    }
}

export default useShoppingCart;

