import express, { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  addDummyDataByrenderFormMiddleware,
  // addDummyDataMiddleware,
  createEntityMiddleware,
} from '@core/middlewares/dummyData.middleware';
import { getUserData, updateUserData, deleteUserData } from './user.controller';
import { getUserDataValidation } from './user.validation';
import { UserSchema, User } from './user.model';

const router: Router = Router();

router
  .route('/user/read/:id')
  .get(
    //  [protectedByApiKey],
    // @ts-ignore
    addDummyDataByrenderFormMiddleware({
      // @ts-ignore
      interfaceType: UserSchema,
      // @ts-ignore
      omitFields: ['userRoles', 'isGiver', 'isTaker'],
    }),
  )
  // @ts-ignore
  .post(
    express.urlencoded({ extended: true }),
    // @ts-ignore
    createEntityMiddleware({ model: User, interfaceType: UserSchema }),
    [validation(getUserDataValidation), getUserData],
  );
router.put('/user/update/:id', [protectedByApiKey], updateUserData);
router.delete('/user/:id', [protectedByApiKey], deleteUserData);

export default router;
