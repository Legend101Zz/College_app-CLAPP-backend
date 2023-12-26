import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import user from '@components/app/user/user.router';
import giver from '@components/app/giver/giver.router';
import doer from '@components/app/doer/doer.router';

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(giver);
router.use(doer);

export default router;
