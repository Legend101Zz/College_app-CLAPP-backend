import { Router } from 'express';
// import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import {
  registerGiverController,
  glatRoute,
  deleteTaskController,
} from './giver.controller';

const router: Router = Router();
router.get('/giver', glatRoute);
router.post('/giver/:id', registerGiverController);
router.post('/giver/:userId/tasks/:taskId', deleteTaskController);

export default router;
