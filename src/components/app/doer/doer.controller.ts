import { Request, Response } from 'express';
// import mongoose from 'mongoose';
import httpStatus from 'http-status';
import doerService from './doer.service';
import { IDoer } from './doer.interface';
import io
// import mongoose from 'mongoose';

const registerDoerController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const {
      FullName,
      DisName,
      Description,
      Skills,
      Education,
      Experience,
      LinkedIn,
      Wallet,
      Tasks,
      Specialtags,
    } = req.body;

    if (!userId || !FullName || !DisName || !Description) {
      res.status(httpStatus.BAD_REQUEST).json({
        error: 'requirement not fullfilled',
      });
      return;
    }

    const taskIds = Tasks.map((task: any) => task.taskId);

    const newDoer = await doerService.registerDoer({
      userId,
      FullName,
      DisName,
      Description,
      Skills,
      Education,
      Experience,
      LinkedIn,
      walletId: Wallet,
      taskIds,
      Specialtags,
    });

    res.status(httpStatus.OK).json(newDoer);
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const deleteDoerTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const taskId = req.params.taskId as string;

    if (!userId || !taskId) {
      res
        .status(400)
        .json({ error: 'userId and taskId are required parameters' });
      return;
    }

    const deletedDoer = await doerService.deleteDoerTask(userId, taskId);

    // Check if the task was successfully deleted
    if (!deletedDoer) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    // Send a success response with status code 200
    res.status(200).json(deletedDoer);
  } catch (error) {
    throw new Error(`Error deleting task: ${error.message}`);
  }
};

const updateDoerUsingUserIdController = async (req: Request, res: Response) => {
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

    // Update the doer using the service function
    const updatedDoer = await doerService.updateDoerUsingUserId(
      userId,
      updateData,
    );

    // Send the updated doer as the response
    res.status(httpStatus.OK).json(updatedDoer);
  } catch (error) {
    throw new Error(`Error updating doer: ${error.message}`);
  }
};

const getDoerByUserIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Assuming the userId is in the URL parameters

    // Ensure that userId is provided
    if (!userId) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'userId is a required parameter' });
      return;
    }

    // Get doer data by userId using the service function
    const doerData = await doerService.getDoerByUserId(userId);

    // If doerData is null, doer not found
    if (!doerData) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Doer not found for the provided userId' });
      return;
    }

    // Send the doer data as the response
    res.status(httpStatus.OK).json(doerData);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDoerData = async (req: Request, res: Response) => {
  const { doerId } = req.params;
  doerId.toString();
  if (!doerId) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid doerId' });
    return;
  }

  try {
    // Get dynamic fields from the query parameters
    const dynamicFields: (keyof IDoer)[] | undefined = req.query.fields
      ? ((req.query.fields as string).split(',') as (keyof IDoer)[])
      : undefined;

    // console.log('Giver ID:', giverId);
    // console.log('Dynamic Fields:', dynamicFields);

    // Use the giverService read function with dynamic fields
    const userData = await doerService.read(doerId, dynamicFields);

    // console.log('User Data:', userData);

    if (!userData) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'Doer not found' });
      return;
    }

    res.status(httpStatus.OK).json(userData);
  } catch (error) {
    // console.error('Error in getGiverData:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

// export default getGiverData;

export default {
  registerDoerController,
  deleteDoerTaskController,
  updateDoerUsingUserIdController,
  getDoerByUserIdController,
  getDoerData,
};
