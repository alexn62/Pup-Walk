export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  sex?: string;
  profilePhoto?: string;
  accountCreated?: Date;
  dogs?: Dog[];
  jobs?: Job[];
  appliedTo?: Job[];
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  sex: string;
  age: number;
  dogPhoto?: string;
  owner: User;
  description: string;
}

export interface Job {
  id: string;
  user: User;
  dog: Dog;
  title: string;
  details: string;
  jobLocation: { type: { type: string }; coordinates: number[] };
  duration: number;
  hourlyPay: number;
  timePosted: Date;
  startTime: Date;
  status: string;
  acceptedUser: User;
  candidates: User[];
  city?: string;
  locality?: string;
}
