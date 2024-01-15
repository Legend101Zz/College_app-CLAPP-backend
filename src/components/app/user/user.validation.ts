import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

const getUserDataValidation: ValidationSchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .description('User ID in hexadecimal format (24 characters)'),
  }),
  query: Joi.object({
    includeFields: Joi.array()
      .items(Joi.string())
      .description('Array of fields to include in the response'),
  }),
};

const updateUserDataValidation: ValidationSchema = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .description('User ID in hexadecimal format (24 characters)'),
  }),
  body: Joi.object({
    update: Joi.object()
      .required()
      .description('Object containing fields to update'),
  }),
};

// eslint-disable-next-line import/prefer-default-export
export { getUserDataValidation, updateUserDataValidation };
