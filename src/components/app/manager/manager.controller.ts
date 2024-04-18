import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import { createNamespace } from './manager.socket.service';
import validManagerService from './manager.service';
import {
  createCommunityService,
  isValidCommunityName,
} from '../community/community.service';

const handleCommunityCreation = async (req: Request, res: Response) => {
  const { name, giver, manager, task } = req.body;
  // const giverId = new mongoose.Types.ObjectId(giver);
  // Call the createCommunityService to create the community
  const community = await createCommunityService({
    name,
    giver,
    manager,
    task,
  });
  const communityName = `${name}_${community._id}`;
  const io: Server = req.app.get('io');
  if (isValidCommunityName(communityName)) {
    createNamespace(io, communityName);
    // Respond to the client
    res.status(200).json({ communityName });
  } else {
    res.status(400).send('Invalid Community Name');
  }
};

// const handleRoomCreation = async (req: Request, res: Response) => {};

// eslint-disable-next-line import/prefer-default-export
export { handleCommunityCreation };
