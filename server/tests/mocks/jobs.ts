import { Job } from '../../interfaces/job-interface';

const mockJob: Job = {
  id: '',
  userId: '',
  dogId: '',
  title: 'Quick Walk',
  details: 'Super chill dog need her walkie.',
  location: { latitude: 100, longitude: 100 },
  duration: 60,
  hourlyPay: 18,
  startTime: '05 October 2021 14:48 UTC',
  status: 'open',
  timePosted: '',
};

export { mockJob };
