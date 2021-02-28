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
    required: true,
    type: String
  },
  rate: {
    type: Number,
    required: true
  }
});

/**
 * Virtuals
 */

// ResourceSchema.virtual('name.full').get(function() {
//   return `${this.name.first} ${this.name.last}`;
// });

// ResourceSchema.virtual('password').set(function(password) {
//   this._password = password;
// });

/**
 * Pre-save hook
 */
ResourceSchema.pre('save', function(next) {
  if (!this._password) {
    return next();
  }

  this.setPassword(this._password).then(() => next());
});

// ResourceSchema.plugin(passportLocalMongoose, {
//   usernameField: 'email'
// });

ResourceSchema.methods.setPassword = pify(ResourceSchema.methods.setPassword);

export default createSeed('Resource', ResourceSchema, seed);
