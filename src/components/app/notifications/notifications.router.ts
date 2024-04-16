import { Router } from 'express';
import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import validation from '@core/middlewares/validate.middleware';
import { handleNotificationRequest } from './notifications.controller';
import { notificationValidationSchema } from './notifications.validation';

const router: Router = Router();

router.post(
  '/notifications/send',
  [protectedByApiKey, validation(notificationValidationSchema)],
  handleNotificationRequest,
);

export default router;
