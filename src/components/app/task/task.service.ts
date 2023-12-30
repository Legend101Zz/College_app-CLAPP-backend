import mongoose from 'mongoose';
import {
  ITask,
  CommonTaskFields,
  AdditionalFields,
  Goal,
} from './task.interface';
import TaskModel from './task.model';

export interface CreateTaskInput extends CommonTaskFields {
  additionalFields: AdditionalFields;
  goals: Goal[];
  status: 'draft' | 'in progress' | 'done';
}

const createTask = async (taskInput: CreateTaskInput): Promise<ITask> => {
  try {
    const newTask: ITask = new TaskModel({
      ...taskInput,
    });

    // Save the ntw task to the database
    const savedTask = await newTask.save();

    return savedTask;
  } catch (error) {
    // Handle errors
    throw new Error(`Error creating task: ${error.message}`);
  }
};

// Define the type for the update object
type TaskUpdate = {
  [key in keyof ITask]?: ITask[key];
};

const updateTask = async (
  taskId: mongoose.Types.ObjectId,
  updateObject: TaskUpdate,
): Promise<ITask> => {
  // Ensure that the updateObject is not empty
  if (Object.keys(updateObject).length === 0) {
    throw new Error('Update object cannot be empty.');
  }

  try {
    const result = await TaskModel.updateOne(
      { _id: taskId },
      { $set: updateObject },
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      throw new Error('Task not found or no fields were modified.');
    }

    // Fetch the updated task document
    const updatedTask = await TaskModel.findById(taskId);

    // If the task is not found, throw an error
    if (!updatedTask) {
      throw new Error('Task not found after update.');
    }

    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task details: ${error.message}`);
  }
};

const deleteTask = async (taskId: mongoose.Types.ObjectId): Promise<void> => {
  try {
    // Find the task by ID and delete it
    const result = await TaskModel.findByIdAndDelete(taskId);

    // Check if the task was found and deleted
    if (!result) {
      throw new Error('Task not found or could not be deleted.');
    }
  } catch (error) {
    // Handle errors

    throw new Error('Internal Server Error');
  }
};

export { createTask, updateTask, deleteTask };
