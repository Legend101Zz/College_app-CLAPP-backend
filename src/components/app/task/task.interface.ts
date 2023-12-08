import mongoose, { Document, Schema } from 'mongoose';

interface CommonTaskFields {
  title: string;
  description: string;
  category: 'content' | 'web' | 'video' | 'assignment' | 'design';
  deadline: Date;
  budget: number;
}

interface AdditionalFields {
  [key: string]: string;
}

export interface Task extends CommonTaskFields, Document {
  additionalFields: AdditionalFields;
}

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
  budget: {
    type: Number,
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
