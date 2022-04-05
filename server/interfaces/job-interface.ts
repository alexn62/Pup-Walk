import { JobLocation } from './location-interface';

export interface Job {
  id: string;
  userId: string;
  dogId: string;
  title: string;
  details: string;
  location: JobLocation;
  duration: number;
  hourlyPay: number;
  timePosted: string;
  startTime: string;
  status: string;
  acceptedUser: string;
  candidates: string[];
}
