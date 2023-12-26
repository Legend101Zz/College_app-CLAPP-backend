import { Request, Response } from 'express';
// import mongoose from 'mongoose';
import httpStatus from 'http-status';
import doerService from './doer.service';
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
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

export default { registerDoerController };
