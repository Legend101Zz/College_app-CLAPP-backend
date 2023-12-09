import mongoose, { Schema } from 'mongoose';
import { IGiver } from './giver.interface';

const GiverSchema: Schema<IGiver> = new Schema({
  Badge: {
    category: { type: String },
  },
  ResponseTime: { type: Number },
  Wallet: { type: Number },
  Tasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId },
      taskName: { type: String },
    },
  ],
});

const Giver = mongoose.model<IGiver>('Doer', GiverSchema);
export default Giver;
