import { Job } from './job-interface';

export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  sex?: string;
  profilePhoto?: string;
  dogs?: string[];
  jobs?: Job[];
}
