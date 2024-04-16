import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const notificationValidationSchema: ValidationSchema = {
  body: Joi.object({
    sentBy: Joi.string().required().description('ID of the sender'),
    receivedBy: Joi.array()
      .items(Joi.string())
      .required()
      .description('Array of recipient IDs'),
    message: Joi.string().required().description('Notification message'),
    isRead: Joi.boolean()
      .default(false)
      .description('Flag indicating whether the notification is read'),
    additionalPayload: Joi.string().description(
      'Additional payload for the notification',
    ),
  }),
};

// eslint-disable-next-line import/prefer-default-export
export { notificationValidationSchema };
