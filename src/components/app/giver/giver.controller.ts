import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import logger from '@core/utils/logger';
// import { registerGiver } from '@components/app/giver/giver.service';
// Some other module where you use the functions
import giverService from '@components/app/giver/giver.service';

const registerGiverController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const {
      Badge: { category: badgeCategory },
      ResponseTime,
      Wallet,
      Tasks,
    } = req.body;

    if (!userId || !badgeCategory || !ResponseTime || !Wallet || !Tasks) {
      res.status(httpStatus.BAD_REQUEST).json({
        error:
          'userId, badgeCategory, ResponseTime, Wallet, and Tasks are required parameters',
      });
      return;
    }

    const taskIds = Tasks.map((task: any) => task.taskId);

    const newGiver = await giverService.registerGiver({
      userId,
      badgeCategory,
      responseTime: ResponseTime,
      walletId: Wallet,
      taskIds,
    });

    res.status(httpStatus.OK).json(newGiver);
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const taskId = req.params.taskId as string;

    if (!userId || !taskId) {
      res
        .status(400)
        .json({ error: 'userId and taskId are required parameters' });
      return;
    }

    const deletedGiver = await giverService.deleteGiverTask(userId, taskId);

    // Check if the task was successfully deleted
    if (!deletedGiver) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Send a success response with status code 200
    res.status(200).json(deletedGiver);
  } catch (error) {
    // console.log('Error deleting task:', error);
    throw new Error(`Error deleting task: ${error.message}`);
    // res.status(500).json({ error: 'Internal server error' });
  }
};

const updateGiverusingGiverIdCon = async (req: Request, res: Response) => {
  try {
    const { giverId } = req.params; // Assuming the giverId is in the URL parameters
    const updateData = req.body; // Assuming the update data is in the request body

    // Ensure that giverId and updateData are provided
    if (!giverId || !updateData) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'giverId and updateData are required parameters' });
      return;
    }

    // Update the giver using the service function
    const updatedGiver = await giverService.updateGiverusingGiverId(
      giverId,
      updateData,
    );

    // Send the updated giver as the response
    res.status(httpStatus.OK).json(updatedGiver);
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    throw new Error(`Error deleting task: ${error.message}`);
    // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const updateGiverusingUserIdCon = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assuming the userId is in the URL parameters
    const updateData = req.body; // Assuming the update data is in the request body

    // Ensure that userId and updateData are provided
    if (!userId || !updateData) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'userId and updateData are required parameters' });
      return;
    }

    // Update the giver using the service function
    const updatedGiver = await giverService.updateGiverusingUserId(
      userId,
      updateData,
    );

    // Send the updated giver as the response
    res.status(httpStatus.OK).json(updatedGiver);
  } catch (error) {
    throw new Error(error.message); // Log the error for debugging purposes
  }
};

const getGiverByUserIdCon = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assuming the userId is in the URL parameters

    // Ensure that userId is provided
    if (!userId) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'userId is a required parameter' });
      return;
    }

    // Get giver data by userId using the service function
    const giverData = await giverService.getGiverByUserId(userId);

    // If giverData is null, giver not found
    if (!giverData) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Giver not found for the provided userId' });
      return;
    }

    // Send the giver data as the response
    res.status(httpStatus.OK).json(giverData);
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    throw new Error(error.message);
  }
};

const getGiverByGiverIdCon = async (req: Request, res: Response) => {
  try {
    const { giverId } = req.params; // Assuming the giverId is in the URL parameters

    // Ensure that giverId is provided
    if (!giverId) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'giverId is a required parameter' });
      return;
    }

    // Get giver data by giverId using the service function
    const giverData = await giverService.getGiverByGiverId(giverId);

    // If giverData is null, giver not found
    if (!giverData) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Giver not found for the provided giverId' });
      return;
    }

    // Send the giver data as the response
    res.status(httpStatus.OK).json(giverData);
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    throw new Error(error.message);
    // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const glatRoute = async (req: Request, res: Response) => {
  res.send('Oye Chote nunu waale, sahit route pe jaa yeh glat hai');
};

export {
  registerGiverController,
  deleteTaskController,
  glatRoute,
  updateGiverusingGiverIdCon,
  updateGiverusingUserIdCon,
  getGiverByUserIdCon,
  getGiverByGiverIdCon,
};
