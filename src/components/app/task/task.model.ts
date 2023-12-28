import mongoose, { Schema } from 'mongoose';
import { ITask } from './task.interface';

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['content', 'web', 'video', 'assignment', 'design'],
    required: true,
  },
  goals: [
    {
      description: { type: String, required: true },
      expectedTime: { type: Date, required: true },
      status: {
        type: String,
        enum: ['done', 'not done', 'in progress'],
        default: 'not done',
        required: true,
      },
    },
  ],

  deadline: { type: Date, required: true },
  additionalFields: { type: Map, of: String }, // Using Map for additionalFields
});

const TaskModel = mongoose.model<ITask>('Task', taskSchema);

export default TaskModel;
