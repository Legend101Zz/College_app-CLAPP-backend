import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import {
  createTask,
  CreateTaskInput,
  updateTask,
  deleteTask,
  addNewGoalService,
} from './task.service';

interface DynamicTaskFields {
  [key: string]: string;
}

interface Goal {
  description: string;
  expectedTime: Date;
  status: 'done' | 'notDone' | 'inProgress';
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
    console.log(req.body);
    // Extract common task fields from req.body
    const commonTaskFields: CreateTaskInput = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      deadline: new Date(req.body.deadline),
      additionalFields: {},
      goals: [],
      status: 'draft',
    };

    // Extract additional fields specific to that task from req.body
    const { additionalFields, goals, status }: DynamicTaskFields = req.body;

    // Add additionalFields to the common task fields
    if (additionalFields && typeof additionalFields === 'object') {
      commonTaskFields.additionalFields = additionalFields;
    }

    // Add goals to the common task fields
    if (Array.isArray(goals)) {
      commonTaskFields.goals = goals as Goal[];
    }

    // Set the status in common task fields
    if (status) {
      // @ts-ignore
      commonTaskFields.status = status;
    }

    // Create the task
    const createdTask = await createTask(commonTaskFields);
    req.taskId = createdTask._id;
    next();
  } catch (error) {
    // Handle errors
    logger.error('Error creating task:');
    logger.error(error);
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

const deleteTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { taskId } = req.params;
    console.log(taskId);
    if (!taskId) {
      res
        .status(400)
        .json({ error: 'userId and taskId are required parameters' });
      return;
    }

    // Call the service to delete the task
    // @ts-ignore
    await deleteTask(taskId);

    next();
  } catch (error) {
    logger.error('Error deleting task:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const addNewGoalController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const taskId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(
      req.params.id,
    );
    const goal = req.body;

    const updatedTask = await addNewGoalService(taskId, goal);

    res.status(200).json(updatedTask);
    next();
  } catch (error) {
    logger.error('Error adding new goal to task:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  createTaskFromRequestBody,
  updateTaskController,
  deleteTaskController,
  addNewGoalController,
};
