import { Router } from 'express';
import doerController from './doer.controller';

const router: Router = Router();

router.post('/doer/:id', doerController.registerDoerController); // working fine

router.post(
  '/doer/:userId/tasks/:taskId',
  doerController.deleteDoerTaskController,
); // working fine
router.post(
  '/doer/updateByUserId/:userId',
  doerController.updateDoerUsingUserIdController,
); // working fine
router.get(
  '/doer/getUsingDoerId/:userId',
  doerController.getDoerByUserIdController,
); // working fine

router.get('/doers', (req, res) => {
  res.send('doers'); // working fine
});

router.get('/doers/getDoers/:doerId', doerController.getDoerData); // working fine

export default router;
