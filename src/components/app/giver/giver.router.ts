import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import * as TaskFunc from '@components/app/task/task.index';
import {
  registerGiverController,
  glatRoute,
  deleteTaskController,
  updateGiverusingGiverIdCon,
  updateGiverusingUserIdCon,
  getGiverByGiverIdCon,
  getGiverByUserIdCon,
  getGiverData,
} from './giver.controller';
import {
  deleteTaskValidation,
  getGiverDataValidation,
  registerGiverValidation,
} from './giver.validation';

const router: Router = Router();

// ROUTE TO HANDLE WRONG GIVER ROUTES
router.get('/giver', glatRoute);

// MAIN ROUTES

// Regiter Giver
router.post(
  '/giver/:id',
  [protectedByApiKey, validation(registerGiverValidation)],
  TaskFunc.createTaskFromRequestBody,
  registerGiverController,
);

// Delete Tasks from Giver
router.post(
  '/giver/tasks/:taskId/:giverId',
  [protectedByApiKey, validation(deleteTaskValidation)],
  TaskFunc.deleteTaskController,
  deleteTaskController,
);

// Read Giver Details Dynamically
router.get(
  '/giver/getGivers/:giverId',
  [protectedByApiKey, validation(getGiverDataValidation)],
  getGiverData,
);

// Read Giver Details as whole

router.get(
  '/giver/getUsingGiverId/:giverId',
  [protectedByApiKey],
  getGiverByGiverIdCon,
);
router.get(
  '/giver/getUsingUserId/:userId',
  [protectedByApiKey],
  getGiverByUserIdCon,
);

router.put(
  '/giver/updateByUserId/:userId',
  [protectedByApiKey],
  updateGiverusingUserIdCon,
);
router.put('/giver/updateByGiverId/:giverId', updateGiverusingGiverIdCon);

router.get('/giver/*', glatRoute);

export default router;
