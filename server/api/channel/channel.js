import { Schema } from 'mongoose';
import createSeed from 'mongoose-dependent-seed';
import { number } from 'yup';
import seed from './channel.seed';

export const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number
  }
});

ChannelSchema.pre('validation', function(next) {
  this.date = new Date();
  next();
});

export default createSeed('Channel', ChannelSchema, seed);
