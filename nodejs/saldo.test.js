const { getSaldo, tie, tieneSaldo } = require('./saldo');

describe('Probando funcion getSaldo y tieneSaldo', ()=> {
    test('deberia devolver algo', () => {
        expect(typeof getSaldo()).toBe('number');
        expect(getSaldo()).toBeGreaterThan(0);
    });
    test('deberia devolver true o false', () => {
        expect(typeof tieneSaldo()).toBe('boolean');
        expect(tieneSaldo(5000, getSaldo())).toBe(true);
        expect(tieneSaldo(5000, 300)).toBe(true);
        expect(tieneSaldo(-1000, getSaldo)).toBe(false);
    });
  })
  