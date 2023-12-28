import { Router } from 'express';
// import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import * as TaskFunc from '@components/app/task/task.index';
import {
  registerGiverController,
  glatRoute,
  deleteTaskController,
  updateGiverusingGiverIdCon,
  updateGiverusingUserIdCon,
  getGiverByGiverIdCon,
  getGiverByUserIdCon,
} from './giver.controller';

const router: Router = Router();

router.get('/giver', glatRoute);
router.post(
  '/giver/:id',
  TaskFunc.createTaskFromRequestBody,
  registerGiverController,
);
router.post('/giver/:userId/tasks/:taskId', deleteTaskController);
router.put('/giver/updateByUserId/:userId', updateGiverusingUserIdCon);
router.put('/giver/updateByGiverId/:giverId', updateGiverusingGiverIdCon);
router.get('/giver/getUsingGiverId/:giverId', getGiverByGiverIdCon);
router.get('/giver/getUsingUserId/:userId', getGiverByUserIdCon);

export default router;
