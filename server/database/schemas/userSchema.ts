import * as mongoose from 'mongoose';
import { IUser } from '../../interfaces/user-interface';
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
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
    profilePhoto: {
      type: String,
      required: false,
    },
    dogs: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    jobs: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    appliedTo: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
  },
  { timestamps: { createdAt: 'accountCreated' } }
);

const User = mongoose.model<IUser>('users', userSchema);

export { User };
