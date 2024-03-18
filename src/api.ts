import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/app/user/user.router';
import giver from '@components/app/giver/giver.router';
import doer from '@components/app/doer/doer.router';
import manager from '@components/app/manager/manager.router';
import room from '@components/app/room/room.routes';

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(giver);
router.use(doer);
router.use(manager);
router.use(room);

export default router;
