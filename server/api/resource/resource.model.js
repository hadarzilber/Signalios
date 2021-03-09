import pify from 'pify';
import { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import createSeed from 'mongoose-dependent-seed';
import seed from './resource.seed';

const ResourceSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  }
});

export default createSeed('Resource', ResourceSchema, seed);
