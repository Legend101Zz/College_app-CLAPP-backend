import logger from '@core/utils/logger';
import { Socket } from 'socket.io';
import RoomModel from './room.model';

const authorizeRoomJoin = async (socket: Socket, next: () => void) => {
  try {
    const roomName = socket.handshake.query.room;

    const room = await RoomModel.findOne({ name: roomName });

    if (!room) {
      throw new Error(`Room ${roomName} not found`);
    }

    // Check if the participant is allowed to join the room
    const participantId = socket.handshake.query.userId;
    const isParticipantAllowed = room.participants.some(
      (participant) => String(participant.userId) === participantId,
    );

    if (!isParticipantAllowed) {
      throw new Error(
        `Participant ${participantId} is not allowed to join room ${roomName}`,
      );
    }

    // If participant is allowed, call next to proceed with socket connection
    next();
  } catch (error) {
    logger.error('Authorization error:', error);
    socket.disconnect(true); // Disconnect the socket if authorization fails
  }
};

export default authorizeRoomJoin;
