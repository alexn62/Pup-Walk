import { Schema, model } from 'mongoose';

const dogSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dogPhoto: {
    type: String,
    required: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Dog = model('dogs', dogSchema);

export { Dog };
