import { Request, Response } from 'express';
import { createRoomInCommunityService } from './room.service';

const createRoomInCommunityController = async (req: Request, res: Response) => {
  try {
    await createRoomInCommunityService({
      body: req.body,
      communityId: req.params.communityId,
    });
    const nameWithUnderscores = req.body.name.replace(/\s/g, '_');
    const roomName = `${nameWithUnderscores}_${req.params.communityId}`;
    res.status(201).json({ roomName });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default { createRoomInCommunityController };
