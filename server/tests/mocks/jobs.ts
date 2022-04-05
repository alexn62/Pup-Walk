import { Job } from '../../interfaces/job-interface';

const mockJob: Job = {
  id: '',
  userId: '',
  dogId: '',
  title: 'Quick Walk',
  details: 'Super chill dog need her walkie.',
  location: { latitude: 53, longitude: 13 },
  duration: 60,
  hourlyPay: 18,
  startTime: '05 October 2021 14:48 UTC',
  status: 'open',
  timePosted: '',
};
const mockJob2: Job = {
  id: '',
  userId: '',
  dogId: '',
  title: 'Quick Walkie',
  details: 'Super chill dog need her walkie.',
  location: { latitude: 53.1, longitude: 13 },
  duration: 60,
  hourlyPay: 18,
  startTime: '05 October 2021 14:48 UTC',
  status: 'open',
  timePosted: '',
};

export { mockJob, mockJob2 };
