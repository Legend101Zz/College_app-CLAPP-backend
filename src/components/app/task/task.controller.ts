import mongoose, { Schema } from 'mongoose';
import { Task } from './task.interface';

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['content', 'web', 'video', 'assignment', 'design'],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  additionalFields: {
    type: Map,
    of: String,
    default: {},
  },
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
