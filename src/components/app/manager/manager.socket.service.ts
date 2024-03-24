import { Server, Namespace, Socket } from 'socket.io';
import logger from '@core/utils/logger';
import StandardIOEventCalls from '@core/utils/socket';

// Function to handle creation of namespaces
const createNamespace = (
  io: Server,
  namespaceName: string,
): Namespace | null => {
  try {
    // Create the namespace dynamically
    const namespace = io.of(`/${namespaceName}`);

    // Handle connection event in the namespace
    namespace.on(StandardIOEventCalls.connection, () => {
      namespace.emit('connected', 'hello'); // Emit event to all clients in the namespace
      logger.info({
        message: 'New connection to namespace',
        namespace: namespaceName,
      });
    });

    logger.info({
      message: 'Namespace created successfully',
      namespace: namespaceName,
    });
    return namespace; // Return the created namespace
  } catch (error) {
    throw new Error(`Error creating namespace: ${error.message}`);
  }
};

const createRoom = (namespace: Namespace, roomName: string) => {
  try {
    namespace.on(StandardIOEventCalls.createRoom, (socket: Socket) => {
      socket.join(roomName);
    });

    namespace.emit(StandardIOEventCalls.roomCreated, { roomName });
  } catch (error) {
    throw new Error(`Error creating Room: ${error.message}`);
  }
};

// Function to send a direct message to a specific socket within a namespace
const sendDirectMessage = (
  namespace: Namespace,
  receiverSocketId: string,
  event: string,
  data: any,
): void => {
  // Find the socket with the given ID within the namespace
  const receiverSocket: Socket | undefined =
    namespace.sockets.get(receiverSocketId);

  if (receiverSocket) {
    // Emit the event to the receiver socket
    receiverSocket.emit(event, data);
  } else {
    logger.error(
      `Receiver socket ${receiverSocketId} not found in the namespace.`,
    );
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createNamespace, createRoom, sendDirectMessage };
