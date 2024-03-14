import { Request, Response } from 'express';
import httpStatus from 'http-status';

const handleCommunityCreation = (req: Request, res: Response) => {
  const { communityName } = req.body;
  const io = req.app.get('io');
  // Create the namespace dynamically
  const namespace = io.of(`/${communityName}`);

  namespace.on('connection', () => {
    console.log(`New connection to namespace ${communityName}`);
  });

  // Respond to the client
  res.status(200).json({ communityName });
};
