import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import { getUserData } from './user.controller';
import {
  paramsValidation,
  queryValidation,
  validateOptions,
} from './user.validation';

const router: Router = Router();

router.post(
  '/user/:id',
  [
    protectedByApiKey, // Your apiKey middleware
    ...paramsValidation, // Add validation for req.params
    ...queryValidation, // Add validation for req.query
    validateOptions, // Validation middleware to check the options
  ],
  getUserData,
);
router.get('/user/:id', readUser);
router.put('/user/:id', [protectedByApiKey], updateUser);
router.delete('/user/:id', [protectedByApiKey], deleteUser);

export default router;
