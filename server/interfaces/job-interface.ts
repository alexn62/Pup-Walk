import { Types } from 'mongoose';

export interface IJob {
  id: Types.ObjectId;
  user: Types.ObjectId;
  dog: Types.ObjectId;
  title: string;
  details: string;
  jobLocation: { type: { type: string }; coordinates: number[] };
  duration: number;
  hourlyPay: number;
  timePosted: Date;
  startTime: Date;
  status: string;
  acceptedUser: Types.ObjectId;
  candidates: Types.ObjectId[];
}
