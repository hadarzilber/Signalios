import { Schema } from 'mongoose';
import createSeed from 'mongoose-dependent-seed';
import seed from './signal.seed';

const SignalSchema = new Schema({
  name: {
    type: String
  },
  recommended: {
    type: Number
  },
  isActive: {
    type: Boolean
  }
});

export default createSeed('Signal', SignalSchema, seed);
