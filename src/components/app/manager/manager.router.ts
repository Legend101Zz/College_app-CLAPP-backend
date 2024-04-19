import { Router } from 'express';
import validManagerMiddleware from "@core/middlewares/TaskValidation.middleware.ts"

import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import { handleCommunityCreation } from './manager.controller';
import { valid } from 'joi';

const router: Router = Router();

router.get('/manager', (req, res) => {
  res.send('Manager route');
});

router.post(
  '/manager/create-community',
  [protectedByApiKey, validManagerMiddleware],
  handleCommunityCreation,
);
// router.get('/manager/valid/ ', validManagerController);
// router.get('/validate-manager/task/:taskId', validManagerController); //working

export default router;
