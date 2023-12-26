import mongoose, { Schema } from 'mongoose';
import { IDoer, PrimarySkillEnum } from './doer.interface';

const SubSkillSchema = new Schema({
  name: { type: String, required: true },
  // other sub-skill properties
});

const PrimarySkillSchema = new Schema({
  name: { type: String, enum: Object.values(PrimarySkillEnum), required: true },
  subSkills: [SubSkillSchema],
});

const DoerSchema: Schema<IDoer> = new Schema({
  FullName: { type: String, required: true },
  Dis_name: { type: String, required: true },
  Description: { type: String, required: true },
  Skills: [PrimarySkillSchema],
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
  Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  Reviews: [
    {
      review: { type: String },
      rating: { type: Number },
    },
  ],
  Specialtags: [{ type: String }],
});

const Doer = mongoose.model<IDoer>('Doer', DoerSchema);

export default Doer;
