import * as mongoose from 'mongoose';
import { IJob } from '../../interfaces/job-interface';
const jobSchema = new mongoose.Schema<IJob>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dog: {
      type: mongoose.Schema.Types.ObjectId,
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
    jobLocation: {
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
    startTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'open',
    },
    acceptedUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    candidates: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      default: [],
    },
    city: {
      type: String,
      required: false,
    },
    locality: {
      type: String,
      required: false,
    },
  },
  { timestamps: { createdAt: 'timePosted' } }
);

const Job = mongoose.model('jobs', jobSchema);

export { Job };
