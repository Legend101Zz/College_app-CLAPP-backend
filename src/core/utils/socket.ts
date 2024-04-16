const StandardIOEventCalls = {
  connection: 'connection',
  userJoined: 'userJoined',
  userLeft: 'userLeft',
  messageReceived: 'messageReceived',
  roomCreated: 'roomCreated',
  createRoom: 'createRoom',
  notification: 'sendNotification',
} as const;

export default StandardIOEventCalls;
