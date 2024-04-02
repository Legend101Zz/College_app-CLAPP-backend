import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

interface CustomRequest extends Request {
  io: Server;
}

const attachSocketIoMiddleware = () => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const io: Server = req.app.get('io');
    req.io = io;
    next();
  };
};

export default attachSocketIoMiddleware;
