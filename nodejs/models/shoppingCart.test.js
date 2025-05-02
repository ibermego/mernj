const { ShoppingCart } = require('./shoppingCart'); // OJO CLASES EMPIEZAN EN MAYUSCULAS

describe('Shopping Cart', ()=> {
    test('Pruebas shopping cart', () => {
        const cart = new ShoppingCart("Euro");                                          // 1º instaciar

        expect(cart.getItemCount()).toBe(0);                                            // 2º comprobar que esta bacia
        
        // añadiendo 1 item
        cart.addItem({id:1, nombre: "camiseta", "precio": 2.99, "cantidad": 1});        // 3º añadimos un item (articulo)
        expect(cart.getItemCount()).toBe(1);                                            // 4º comprobar que tiene un item

        // añadiendo otro item
        cart.addItem({id:2, nombre: "pantalones", "precio": 22.99, "cantidad": 1});     // 4º añadimos otro item
        expect(cart.getItemCount()).toBe(2);                                            // 5º compobar que tiene dos items
        // conseguimos cantidad de artículos
        expect(cart.getItems().length).toBe(2)                                          // 6º comprobamos que tiene dos items
        // otra forma de comprobar igual a la línea de arriba
        // const items = cart.getItems()
        // expect(items.length).toBe(2)

        // vaciando
        cart.clearCart();                                                               // 7º vaciamos el cart
        expect(cart.getItemCount()).toBe(0);                                            // 8º comprobamos que no tiene items
        // devuelve todos los items
        // se queda pending

    });
    // test('deberia dividir dos numeros', () => {
    //   expect(dividir(3, 3)).toBe(1);
    //   expect(dividir(4, 2)).toBe(2);
    //   expect(() => dividir(5, 0)).toThrowError("No se puede dividir entre cero"); 
    //   expect(typeof dividir(5,5)).toBe("number");
    // });
    // test('pruebas de restar', () => {
    //   expect(restar(10, 2)).toBe(8)
  
    // });
    // test('pruebas de formatPrice', () => {
    //   // expect(formatPrice(9.95)).toBe("$9.95")
    //   expect(formatPrice(9.999)).toBe("$10.00")
    //   expect(formatPrice(9.994)).toBe("$9.99")
    //   expect(formatPrice(9.995)).toBe("$9.99")
    //   expect(formatPrice(9.996)).toBe("$10.00")
    // });
    // test('pruebas de convertirDuracion', () => {
    //   expect(convertirDuracion(120, "segundos", "minutos")).toBe(2)
    //   expect(convertirDuracion(120, "segundos", "segundos")).toBe(120)
    //   expect(convertirDuracion(2, "minutos", "segundos")).toBe(120)
    // });
  })
  
  