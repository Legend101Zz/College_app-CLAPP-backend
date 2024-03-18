import { Router } from 'express';
import roomController from './room.controller';

const router: Router = Router();

router.get('/room', (req, res) => {
  res.send('room'); // working fine
});
router.post(
  '/room/create/:communityId',
  roomController.createRoomInCommunityController,
);

export default router;
