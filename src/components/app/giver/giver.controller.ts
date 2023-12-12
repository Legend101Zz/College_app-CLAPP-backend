import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '@core/utils/logger';
import registerGiver from '@components/app/giver/giver.service';

const registerGiverController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const newGiver = await registerGiver(userId);
    res.status(httpStatus.OK).json(newGiver);
  } catch (error) {
    logger.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

export default registerGiverController;
