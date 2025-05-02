import { param, query, validationResult } from 'express-validator';

/**
 * Middleware to validate the 'id' parameter in the request.
 * https://express-validator.github.io/docs/guides/validation-chain
 * @function validateUserId
 * @returns {Array} Array of express-validator validation chain
 */
export const validateUserId = [
    param('id')
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

  export const validateQuery = [
    query('person').notEmpty().withMessage('Person es obligatorio'),
    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({errores: error.array()}) // Send validation
        }
        next() 
    }
  ]
  