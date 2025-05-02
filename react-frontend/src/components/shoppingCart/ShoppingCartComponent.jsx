import React, { useState } from "react";
import ShoppingCart from "../../models/shoppingCart";

const ShoppingCartComponent = () => {
    const [cart, setCart] = useState(new ShoppingCart("Euros"))

    const handleAddItem = () => {
        console.log("adding item ...")

        const newItem = {
            id: 1,
            nombre: "camiseta",
            precio: 2.99,
            cantidad: 2
        }

        const updatedCart = new ShoppingCart(cart.currency);
        updatedCart.items = [...cart.getItems(), newItem]
        setCart(updatedCart)
    }
    return (
        <>
            <button onClick={handleAddItem}>Add item</button>
            <ul>
                {cart.getItems().map(item => (
                    <>
                        <li key={item.id}>{item.nombre} - {item.cantidad} - {item.precio}€</li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default ShoppingCartComponent