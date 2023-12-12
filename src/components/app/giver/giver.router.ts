import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
// import validation from '@core/middlewares/validate.middleware';
import registerGiverController from './giver.controller';

const router: Router = Router();

router.post('/giver/:id', [protectedByApiKey], registerGiverController);
