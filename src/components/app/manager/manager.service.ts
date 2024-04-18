import Manager from './manager.model';

const validManagerService = async (taskId: string, managerId: string) => {
  try {
    if (!managerId) {
      throw new Error('Manager ID is required.');
    }
    if (!taskId) {
      throw new Error('Task ID is required.');
    }
    const manager = await Manager.findById(managerId);

    if (!manager) {
      throw new Error('Not valid Manager');
    }
    const taskExists = manager.Tasks.some(
      (task) => task.taskId.toString() === taskId,
    );
    if (!taskExists) {
      throw new Error('Manager is not authorized for current task');
    }
    return true;
  } catch (error) {
    throw new Error(`validating manager: ${error.message}`);
  }
};

export default validManagerService;
