import express, { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import {
  addDummyDataByrenderFormMiddleware,
  addDummyDataMiddleware,
  createEntityMiddleware,
} from '@core/middlewares/dummyData.middleware';
import { getUserData, updateUserData, deleteUserData } from './user.controller';
import {
  getUserDataValidation,
  updateUserDataValidation,
} from './user.validation';
import { UserSchema, User } from './user.model';

const router: Router = Router();

// const dummyUserData = [
//   {
//     username: 'user1',
//     email: 'user1@example.com',
//     password: 'password1',
//     googleId: 'googleId1',
//     phone: '123-456-7890',
//   },
//   {
//     username: 'user2',
//     email: 'user2@example.com',
//     password: 'password2',
//     googleId: 'googleId2',
//     phone: '987-654-3210',
//   },
//   {updateUserDataValidation ,updateUserDataValidation ,updatePasswordtePassword
//     username: 'user3',
//     email: 'user3@example.com',
//     password: 'password3',
//     googleId: 'googleId3',
//     phone: '555-555-5555',
//   },
//   {
//     username: 'user4',
//     email: 'user4@example.com',
//     password: 'password4',
//     googleId: 'googleId4',
//     phone: '777-888-9999',
//   },
//   {
//     username: 'user5',
//     email: 'user5@example.com',
//     password: 'password5',
//     googleId: 'googleId5',
//     phone: '111-222-3333',
//   },
// ];

// router
//   .route('/user/read/:id')
//   .get(
//     //  [protectedByApiKey],
//     // @ts-ignore
//     addDummyDataMiddleware({ model: User, dummyData: dummyUserData }),
//     // @ts-ignore
//     addDummyDataByrenderFormMiddleware({
//       // @ts-ignore
//       interfaceType: UserSchema,
//       // @ts-ignore
//       omitFields: ['userRoles', 'isGiver', 'isTaker'],
//     }),
//   )
//   // @ts-ignore
//   .post(
//     express.urlencoded({ extended: true }),
//     // @ts-ignore
//     createEntityMiddleware({ model: User, interfaceType: UserSchema }),
//     [validation(getUserDataValidation), getUserData],
//   );

router.get(
  '/user/read/:id',
  [protectedByApiKey, validation(getUserDataValidation)],
  getUserData,
);
router.post(
  '/user/update/:id',
  [protectedByApiKey, validation(updateUserDataValidation)],
  updateUserData,
);

// ============USE WITH CAUTION AS ITS DELETE THE ENTIRE USER =========

// eslint-disable-next-line max-len
// PS: UPDATE THIS SO THAT IF A USER IS DELETED IT'S ASSOCIATED GIVER , WALLET ETC ARE DELETED OR IF LEFT A COLUMN OF OLD/DELETED USER IS ADDED
router.delete('/user/delete/:id', [protectedByApiKey], deleteUserData);

export default router;
