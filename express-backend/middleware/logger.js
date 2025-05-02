// creamos un middleware para que entre siempre y muestre fecha método y url
// Logger Middleware
export function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}