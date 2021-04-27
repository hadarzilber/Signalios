import { Schema } from 'mongoose';
import createSeed from 'mongoose-dependent-seed';
import seed from './regex.seed';

const RegexSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  regex: {
    required: true,
    type: String
  },
});

export default createSeed('Regex', RegexSchema, seed);
