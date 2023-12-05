import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  addDummyDataByrenderFormMiddleware,
  addDummyDataMiddleware,
} from '@core/middlewares/dummyData.middleware';
import { getUserData, updateUserData, deleteUserData } from './user.controller';
import { getUserDataValidation } from './user.validation';
import { UserSchema } from './user.model';

const router: Router = Router();

router
  .route('/user/read/:id')
  .get(
    [protectedByApiKey],
    // @ts-ignore
    addDummyDataByrenderFormMiddleware({ interfaceType: UserSchema }),
  )
  .post(,[validation(getUserDataValidation), getUserData]);
router.put('/user/update/:id', [protectedByApiKey], updateUserData);
router.delete('/user/:id', [protectedByApiKey], deleteUserData);

export default router;
