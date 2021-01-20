import { Schema } from 'mongoose';
import createSeed from 'mongoose-dependent-seed';
import seed from './notification.seed';

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  involvedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  viewed: { type: Boolean, default: false },
  date: Date
});

export default createSeed('Notification', NotificationSchema, seed);
