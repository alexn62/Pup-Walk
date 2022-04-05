import * as mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  dog: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    require: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  duration: {
    type: Number,
    required: true,
  },
  hourlyPay: {
    type: Number,
    required: true,
  },
  timePosted: {
    type: Date,
    default: Date.now(),
  },
  startTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: 'Open',
  },
  candidates: {
    type: Array,
    required: false,
    default: [],
  },
  acceptedUser: {
    type: String,
    required: false,
  },
});

const Job = mongoose.model('jobs', jobSchema);

export { Job };
