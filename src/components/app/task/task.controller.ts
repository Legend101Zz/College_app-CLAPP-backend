import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import { createTask, CreateTaskInput, updateTask } from './task.service';

interface DynamicTaskFields {
  [key: string]: string;
}

const createTaskFromRequestBody = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Extract common task fields from req.body
    const commonTaskFields: CreateTaskInput = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      deadline: new Date(req.body.deadline),
      additionalFields: new Map<string, string>(),
    };

    // Extract additional fields specific to that task from req.body
    const { additionalFields }: DynamicTaskFields = req.body;

    const keys = Object.keys(additionalFields);

    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(additionalFields, key)) {
        // @ts-ignore
        // eslint-disable-next-line security/detect-object-injection
        commonTaskFields.additionalFields[key] = additionalFields[key];
      }
    });
    // Create the task
    const createdTask = await createTask(commonTaskFields);

    res.status(201).json(createdTask);
  } catch (error) {
    // Handle errors
    logger.error('Error creating task:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createTaskFromRequestBody };
