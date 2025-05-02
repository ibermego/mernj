function sumar(a, b) {
    return a + b;
  }
  
function dividir(a, b) {
    if (b === 0) {
      throw new Error('No se puede dividir entre cero');
    }
    return a / b;
  }

function restar(x, y) {
    return x - y
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function convertirDuracion(tiempo, medida1, medida2) {

    // if ((medida1 == "segundos" && medida2 == "minutos"))
    //     return tiempo/60
    // else if (medida1 =="segundos" && medida2 == "segundos")
    //     return tiempo
    // else 
    //     return tiempo*60
    
    switch (true) {
        case medida1 == "segundos" && medida2 == "minutos":
            return tiempo/60
        case medida1 == "segundos" && medida2 == "segundos":
            return tiempo
        default:
            return tiempo*60
    }
}
  
module.exports = { sumar, dividir, restar, formatPrice, convertirDuracion }; // porque es comm