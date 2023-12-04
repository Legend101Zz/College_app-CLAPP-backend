import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const getUserDataValidation: ValidationSchema = {
  params: Joi.object().keys({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  query: Joi.object().keys({
    includeFields: Joi.array().items(Joi.string()),
  }),
};

// eslint-disable-next-line import/prefer-default-export
export { getUserDataValidation };
