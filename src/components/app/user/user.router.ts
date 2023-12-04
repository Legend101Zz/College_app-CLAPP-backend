import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import { getUserData, updateUserData } from './user.controller';
import { getUserDataValidation } from './user.validation';

const router: Router = Router();

router.get(
  '/user/read/:id',
  [protectedByApiKey, validation(getUserDataValidation)],
  getUserData,
);
router.put(
  '/user/update/:id',
  [protectedByApiKey, validation(getUserDataValidation)],
  updateUserData,
);
router.delete('/user/:id', [protectedByApiKey], deleteUser);

export default router;
