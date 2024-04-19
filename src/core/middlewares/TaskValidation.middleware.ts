import { Request, Response, NextFunction } from 'express';
import logger from '@core/utils/logger';
import validManagerService from '@components/app/manager/manager.service';
import validateGiver from '@components/app/giver/giver.service';

const validManagerMiddleware = async (
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

const validateGiverMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { giverId } = req.query;

    // Check if taskId and giverId are provided
    if (!taskId || !giverId) {
      res.status(400).json({ error: 'taskId and giverId are required' });
      return;
    }

    // Call the service to validate the giver's task association
    // @ts-ignore
    await validateGiver(taskId, giverId);

    next();
  } catch (error) {
    logger.error('Error validating giver task association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { validManagerMiddleware, validateGiverMiddleware };
