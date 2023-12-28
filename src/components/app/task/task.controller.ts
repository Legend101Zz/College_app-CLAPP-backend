import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import { createTask, CreateTaskInput, updateTask } from './task.service';

interface DynamicTaskFields {
  [key: string]: string;
}

interface CustomRequest extends Request {
  taskId?: string;
}

const createTaskFromRequestBody = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Extract common task fields from req.body
    const commonTaskFields: CreateTaskInput = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      deadline: new Date(req.body.deadline),
      // @ts-ignore
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
    req.taskId = createdTask._id;
    next();
  } catch (error) {
    // Handle errors
    logger.error('Error creating task:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const updateTaskController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // check can cause problem test ......
    const taskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id,
    );
    const updateObject = req.body;

    // Call the service to update task details
    const updatedTask = await updateTask(taskId, updateObject);

    res.status(200).json(updatedTask);
  } catch (error) {
    logger.error('Error updating task:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createTaskFromRequestBody, updateTaskController };
