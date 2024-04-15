import mongoose from 'mongoose';

export interface INotifications {
  sentby: mongoose.Schema.Types.ObjectId;
  receivedBy: mongoose.Schema.Types.ObjectId[];
  message: string;
  isRead?: boolean;
  additionalPayload?: string;
}
