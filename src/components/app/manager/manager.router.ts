import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import {
  handleCommunityCreation,
  validManagerController,
} from './manager.controller';

const router: Router = Router();

router.get('/manager', (req, res) => {
  res.send('Manager route');
});

router.post(
  '/manager/create-community',
  [protectedByApiKey],
  handleCommunityCreation,
);
// router.get('/manager/valid/ ', validManagerController);
// router.get('/validate-manager/task/:taskId', validManagerController); //working

export default router;
