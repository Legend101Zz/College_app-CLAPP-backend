import mongoose, { Schema, Document } from 'mongoose';
import { INotifications } from './notications.interface';

const NotificationsSchema: Schema = new Schema({
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receivedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  additionalPayload: { type: String }, // Additional optional field
});

interface INotificationsDocument extends INotifications, Document {}

const NotificationsModel = mongoose.model<INotificationsDocument>(
  'Notifications',
  NotificationsSchema,
);

export default NotificationsModel;
