// registerCommunityController.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import logger from 'your-logger-package'; // Import your logger package here
import createCommunityService from './community.service'; // Import createCommunityService from communityService

const registerCommunityController = async (req: Request, res: Response) => {
  try {
    const { name, doer, giver, manager, task, rooms } = req.body;

    // Call the createCommunityService to create the community
    const community = await createCommunityService({
      name,
      doer,
      giver,
      manager,
      task,
      rooms,
    });

    return res.status(httpStatus.OK).json(community);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

export default registerCommunityController;
