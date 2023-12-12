import mongoose, { Schema } from 'mongoose';
import { IGiver } from './giver.interface';

const GiverSchema: Schema<IGiver> = new Schema({
  Badge: {
    category: {
      type: String,
      enum: ['rookie', 'intermediate', 'advanced'],
      default: 'rookie',
    },
  },
  ResponseTime: { type: Number },
  Wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  Tasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
      taskName: { type: String },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const GiverModel = mongoose.model<IGiver>('Doer', GiverSchema);
export default GiverModel;
