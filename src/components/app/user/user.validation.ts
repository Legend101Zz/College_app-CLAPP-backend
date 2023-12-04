// import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { validationResult, param, query } from 'express-validator';
// import { ValidationSchema } from '@core/interfaces/validationSchema';

const paramsValidation = [
  param('id').isMongoId().withMessage('Invalid user ID'), // Example: Check if it's a valid MongoDB ObjectId
];

// Validation schema for req.query
const queryValidation = [
  query('includeFields')
    .optional()
    .isArray()
    .withMessage('includeFields must be an array'),
  // Add more validation rules for other query parameters as needed
];

// Middleware to validate the options in the query
const validateOptions = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Send a Bad Request response with status code 400 for validation errors
    return res.status(httpStatus.BAD_REQUEST).json({ error: errors.array() });
  }

  return next();
};

export { paramsValidation, queryValidation, validateOptions };
