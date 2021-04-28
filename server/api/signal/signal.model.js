import { Schema } from 'mongoose';
import createSeed from 'mongoose-dependent-seed';
import seed from './signal.seed';

export const SignalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  entryPrice: {
    type: Number,
    required: true
  },
  takeProfit: {
    type: Number,
    required: true
  },
  stopLoss: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
});

SignalSchema.pre('validation', function(next) {
  this.date = new Date();
  next();
});

export default createSeed('Signal', SignalSchema, seed);
