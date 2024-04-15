import mongoose, { Schema } from 'mongoose';
import { IManager } from './manager.interface';

const ManagerSchema: Schema<IManager> = new Schema({
  FullName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  DisName: { type: String, required: true },
  Description: { type: String, required: true },
  // Skills: [PrimarySkillSchema],
  Education: {
    collegeName: { type: String },
    major: { type: String },
  },
  Experience: {
    companyName: { type: String },
    position: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  LinkedIn: { type: String },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  Tasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
      // taskName: { type: String },
    },
  ],
  Reviews: [
    {
      review: { type: String },
      rating: { type: Number },
    },
  ],
  Specialtags: [{ type: String }],
});
const Manager = mongoose.model<IManager>('Manager', ManagerSchema);

export default Manager;
