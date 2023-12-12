import { Router } from 'express';
// import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import { registerGiverController, glatRoute } from './giver.controller';

const router: Router = Router();
router.get('/giver', glatRoute);
router.post('/giver/:id', registerGiverController);

export default router;
