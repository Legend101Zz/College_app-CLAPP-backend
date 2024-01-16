import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const registerGiverValidation: ValidationSchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .description('User ID in hexadecimal format (24 characters)'),
  }),
  body: Joi.object({
    title: Joi.string().required().description('Title of the task'),
    description: Joi.string().required().description('Description of the task'),
    category: Joi.string()
      .valid('content', 'web', 'video', 'assignment', 'design')
      .required()
      .description('Category of the task'),
    deadline: Joi.date().required().description('Deadline of the task'),
    additionalFields: Joi.object().description(
      'Additional fields for the task',
    ),
    goals: Joi.array().items(
      Joi.object({
        description: Joi.string().required().description('Goal description'),
        expectedTime: Joi.date()
          .required()
          .description('Expected completion time'),
        status: Joi.string()
          .valid('done', 'notDone', 'inProgress')
          .required()
          .description('Status of the goal'),
      }),
    ),
    status: Joi.string()
      .valid('draft', 'inProgress', 'done')
      .description('Status of the task'),
  }),
};

// eslint-disable-next-line import/prefer-default-export
export { registerGiverValidation };
