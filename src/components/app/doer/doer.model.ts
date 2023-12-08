import mongoose, { Schema } from 'mongoose';
import { IDoer } from './doer.interface';

const DoerSchema: Schema<IDoer> = new Schema({
  ResponseTime: { type: Number },
  Tasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId },
      taskName: { type: String },
    },
  ],
  Reviews: [
    {
      review: { type: String },
      rating: { type: Number },
    },
  ],
  Profile: { type: String },
});

const Doer = mongoose.model<IDoer>('Doer', DoerSchema);

export default Doer;
