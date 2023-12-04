import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import { getUserData } from './user.controller';
import { getUserDataValidation } from './user.validation';

const router: Router = Router();

router.post(
  '/user/:id',
  [protectedByApiKey, validation(getUserDataValidation)],
  getUserData,
);
router.get('/user/:id', readUser);
router.put('/user/:id', [protectedByApiKey], updateUser);
router.delete('/user/:id', [protectedByApiKey], deleteUser);

export default router;
