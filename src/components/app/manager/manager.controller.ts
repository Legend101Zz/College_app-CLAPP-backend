import { Request, Response } from 'express';
import { Server } from 'socket.io';
import logger from '@core/utils/logger';
import httpStatus from 'http-status';

const handleCommunityCreation = (req: Request, res: Response) => {
  const { communityName } = req.body;

  console.log(req.body);
  const io: Server = req.app.get('io');
  // Create the namespace dynamically
  const namespace = io.of(`/${communityName}`);

  namespace.on('connection', () => {
    namespace.emit('connected', 'hello');
    logger.info('A user connected');
    console.log(`New connection to namespace ${communityName}`);
  });

  // Respond to the client
  res.status(200).json({ communityName });
};

// eslint-disable-next-line import/prefer-default-export
export { handleCommunityCreation };
