import { IJob } from '../../interfaces/job-interface';
import { Types } from 'mongoose';
const mockJob: IJob = {
  id: new Types.ObjectId(),
  user: new Types.ObjectId(),
  dog: new Types.ObjectId(),
  title: 'Quick Walk',
  details: 'Super chill dog need her walkie.',
  jobLocation: { type: { type: 'JobLocation' }, coordinates: [53, 13] },
  duration: 60,
  hourlyPay: 18,
  startTime: new Date('05 October 2021 14:48 UTC'),
  status: 'open',
  timePosted: new Date('05 October 2021 14:48 UTC'),
  candidates: [],
  acceptedUser: new Types.ObjectId(),
};
const mockJob2: IJob = {
  id: new Types.ObjectId(),
  user: new Types.ObjectId(),
  dog: new Types.ObjectId(),
  title: 'Quick Walkie',
  details: 'Super chill dog need her walkie.',
  jobLocation: { type: { type: 'JobLocation' }, coordinates: [53.1, 13] },
  duration: 60,
  hourlyPay: 18,
  startTime: new Date('05 October 2021 14:48 UTC'),
  status: 'open',
  timePosted: new Date('05 October 2021 14:48 UTC'),
  candidates: [],
  acceptedUser: new Types.ObjectId(),
};

export { mockJob, mockJob2 };
