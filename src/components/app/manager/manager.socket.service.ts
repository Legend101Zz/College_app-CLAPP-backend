import { Server, Namespace } from 'socket.io';
import logger from '@core/utils/logger';

// Function to handle creation of namespaces
const createNamespace = (
  io: Server,
  namespaceName: string,
): Namespace | null => {
  try {
    // Create the namespace dynamically
    const namespace = io.of(`/${namespaceName}`);

    // Handle connection event in the namespace
    namespace.on('connection', () => {
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
    logger.error({
      message: 'Error creating namespace',
      namespace: namespaceName,
      error,
    });
    return null;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createNamespace };
