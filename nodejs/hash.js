// actividad encriptación
import bcrypt from 'bcrypt'

const password = "qwerty"

// encriptar con 14 pasadas
const hash = await bcrypt.hash(password, 14) // en es modules no hace falta envolver en funcion async
const isMatch = await bcrypt.compare(password, hash)
console.log(hash)
console.log(isMatch)
const isMatch2 = await bcrypt.compare("1234", hash)
console.log(isMatch2)
