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
  details: {
    type: String,
    require: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
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
});

const Job = mongoose.model('jobs', jobSchema);

export { Job };
