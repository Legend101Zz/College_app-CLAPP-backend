import express, { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';

const router: Router = Router();

router.post('/manager/create-community');

export default router;
