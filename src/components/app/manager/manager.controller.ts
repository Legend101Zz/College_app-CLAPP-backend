import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import { createNamespace } from './manager.socket.service';
import createCommunityService from '../community/community.service';

const handleCommunityCreation = async (req: Request, res: Response) => {
  const { name, doer, giver, manager, task, rooms } = req.body;
  // const giverId = new mongoose.Types.ObjectId(giver);
  // Call the createCommunityService to create the community
  const community = await createCommunityService({
    name,
    doer,
    giver,
    manager,
    task,
    rooms,
  });
  const communityName = `${name}_${community._id}`;
  const io: Server = req.app.get('io');

  createNamespace(io, communityName);
  // Respond to the client
  res.status(200).json({ communityName });
};

// eslint-disable-next-line import/prefer-default-export
export { handleCommunityCreation };
