import { Request, Response, NextFunction } from 'express';
import logger from '@core/utils/logger';
import validManagerService from '@components/app/manager/manager.service';
import v

const validManagerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { taskId } = req.params;
    const { managerId } = req.query;
    if (!taskId || !managerId) {
      res.status(400).json({ error: 'taskId and managerId are required' });
      return;
    }
    // Call the service to validate the manager
    // @ts-ignore
    await validManagerService(taskId, managerId);
    next();
  } catch (error) {
    logger.error('Error validating manager:', error);
    res.status(500).json({ error: error.message });
  }
};

const validManagerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { taskId } = req.params;
    const { managerId } = req.query;
    if (!taskId || !managerId) {
      res.status(400).json({ error: 'taskId and managerId are required' });
      return;
    }
    // Call the service to validate the manager
    // @ts-ignore
    await validManagerService(taskId, managerId);
    next();
  } catch (error) {
    logger.error('Error validating manager:', error);
    res.status(500).json({ error: error.message });
  }
};
