import { Router } from 'express';
import doerController from './doer.controller';

const router: Router = Router();

router.post('/doer/:id', doerController.registerDoerController);

router.post(
  '/doer/:userId/tasks/:taskId',
  doerController.deleteDoerTaskController,
);
router.put(
  '/doer/updateByUserId/:userId',
  doerController.updateDoerUsingUserIdController,
);
router.get(
  '/doer/getUsingDoerId/:doerId',
  doerController.getDoerByUserIdController,
);

router.get('/doers', (req, res) => {
  res.send('doers'); // working fine
});

router.get('/doers/getDoers', doerController.getDoerData);

export default router;
