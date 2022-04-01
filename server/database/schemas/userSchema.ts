import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  accountCreated: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: false,
  },
  dogs: {
    type: Array,
    required: false,
    default: [],
  },
  jobs: {
    type: Array,
    required: false,
    default: [],
  },
});

const User = mongoose.model('users', userSchema);

export { User };
