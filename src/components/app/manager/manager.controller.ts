import { Request, Response } from 'express';
import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import { createNamespace } from './manager.socket.service';

const handleCommunityCreation = (req: Request, res: Response) => {
  const { communityName } = req.body;

  console.log(req.body);
  const io: Server = req.app.get('io');

  createNamespace(io, communityName);
  // Respond to the client
  res.status(200).json({ communityName });
};

// eslint-disable-next-line import/prefer-default-export
export { handleCommunityCreation };
