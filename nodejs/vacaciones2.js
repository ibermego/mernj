// FUNCION PARA IMPRIMIR UN ARRAY DE DESTINOS
function veranoProximo(arrayDestino) {
    console.log("******\n")
    arrayDestino.map((destino, index) =>
        console.log(`Yo viajaré a ${destino} en verano!!`)
)
console.log("\n******\n")

for (let index = 0; index < arrayDestino.length; index++) {
    console.log(`Yo viajaré a ${arrayDestino[index]} en verano!!`)        
}
console.log("\n******\n")
}

// MAIN
const destinos = ["Portugal", "Australia", "Peru", "Italia"]
veranoProximo(destinos)

