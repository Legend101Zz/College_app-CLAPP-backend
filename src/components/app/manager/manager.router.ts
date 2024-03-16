import express, { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import { handleCommunityCreation } from './manager.controller';

const router: Router = Router();

router.post(
  '/manager/create-community',
  [protectedByApiKey],
  handleCommunityCreation,
);

export default router;