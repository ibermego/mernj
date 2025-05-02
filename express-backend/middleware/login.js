import jwt from 'jsonwebtoken';

const JWT_SECRET = '12345';


export function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // attach user to request
    next();
  });
}

import { param, query, validationResult } from 'express-validator';

/**
 * Middleware to validate the 'id' parameter in the request.
 * https://express-validator.github.io/docs/guides/validation-chain
 * @function validateUserId
 * @returns {Array} Array of express-validator validation chain
 */
export const validateUserName = [
    param('userName')
    .optional()
      .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),  // Ensures 'id' is a positive integer
    param('edad')
    .optional()
      .isInt({ min: 1 }).withMessage('La edad debe ser un número entero positivo'),  // Ensures 'id' is a positive integer
    param('isActive')
    .optional()
      .isBoolean().withMessage('El valor de "isActive" debe ser un booleano'),  // Validate that 'isActive' is a boolean
    // Middleware to handle validation results
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });  // Send validation errors as response
      }
      next();  // Continue if validation passes
    }
  ];

