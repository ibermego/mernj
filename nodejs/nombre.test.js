const { MiNombre } = require('./nombre');

// console.log(sumar(10, 10)) // primera prueba

/// jestjs.io
// funcion de jest "describe", que es anonima

describe('Probando funcion de cadena', ()=> {
  test('deberia devolver Maria Fernandez', () => {
    expect(MiNombre()).toContain("Maria");
    expect(MiNombre()).toContain("Jon");
  });
})


