import { ITask, CommonTaskFields, AdditionalFields } from './task.interface';
import TaskModel from './task.model';

interface CreateTaskInput extends CommonTaskFields {
  additionalFields: AdditionalFields;
}

const createTask = async (taskInput: CreateTaskInput): Promise<ITask> => {
  try {
    const newTask: ITask = new TaskModel({
      ...taskInput,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    return savedTask;
  } catch (error) {
    // Handle errors
    throw new Error('Error creating task: ' + error.message);
  }
};

export default createTask;
