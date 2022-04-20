import * as dogQueries from '../database/queries/dogQueries';
import * as userQueries from '../database/queries/userQueries';
import * as jobQueries from '../database/queries/jobQueries';

import axios from 'axios';

import { Types, HydratedDocument } from 'mongoose';

import { IDog } from '../interfaces/dog-interface';
import { IUser } from '../interfaces/user-interface';
import { IJob } from '../interfaces/job-interface';

interface AddUserInput {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  sex?: string;
}

interface AddDogInput {
  owner: string;
  name: string;
  age: number;
  sex: string;
  dateAdded?: Date;
  breed: string;
  description: string;
}

interface AddJobInput {
  user: string;
  dog: string;
  title: string;
  details: string;
  longitude: number;
  latitude: number;
  duration: number;
  hourlyPay: number;
  startTime: string;
}
interface DeleteJobInput {
  userId: string;
  jobId: string;
}

interface GetJobsCloseByInput {
  startingPoint: number[];
  maxDistance: number;
}

interface ApplyForJobInput {
  applicantId: string;
  jobId: string;
}

const res = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<IUser> => {
      const user = await userQueries.getUser(new Types.ObjectId(id));
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    },
    getDog: async (_: any, { id }: { id: string }): Promise<IDog> => {
      const dog = await dogQueries.getDog(new Types.ObjectId(id));
      if (!dog) {
        throw new Error('Dog not found.');
      }
      return dog;
    },
    getJob: async (_: any, { id }: { id: string }): Promise<IJob> => {
      const job = await jobQueries.getJob(new Types.ObjectId(id));
      if (!job) {
        throw new Error('Job not found.');
      }
      return job;
    },
    getJobsCloseBy: async (_: any, { startingPoint, maxDistance }: GetJobsCloseByInput): Promise<IJob[]> => {
      const jobs = await jobQueries.getJobsCloseBy(startingPoint, maxDistance);
      if (!jobs) {
        throw new Error('No jobs nearby.');
      }
      return jobs;
    },
  },

  Mutation: {
    addUser: async (_: any, { email, firstName, lastName, middleName, sex }: AddUserInput) => {
      // validate add user input
      const response = await userQueries.addUser(email, firstName, lastName, middleName, sex);
      return response;
    },

    addDog: async (_: any, { owner, name, age, sex, dateAdded, breed, description }: AddDogInput) => {
      // validate add dog input
      const response = await dogQueries.addDog(
        new Types.ObjectId(owner),
        name,
        age,
        sex,
        breed,
        description,
        dateAdded
      );

      return response;
    },
    addJob: async (
      _: any,
      { user, dog, details, longitude, title, latitude, duration, hourlyPay, startTime }: AddJobInput
    ) => {
      console.log(user);
      const response = await jobQueries.addJob(
        new Types.ObjectId(user),
        new Types.ObjectId(dog),
        title,
        details,
        longitude,
        latitude,
        duration,
        hourlyPay,
        startTime
      );
      return response;
    },
    deleteJob: async (_: any, { userId, jobId }: DeleteJobInput) => {
      await userQueries.deleteJob(new Types.ObjectId(userId), new Types.ObjectId(jobId));
      await jobQueries.deleteJob(new Types.ObjectId(jobId));
      return jobId;
    },
    applyForJob: async (_: any, { applicantId, jobId }: ApplyForJobInput) => {
      await userQueries.applyForJob(new Types.ObjectId(applicantId), new Types.ObjectId(jobId));
      const response = await jobQueries.addApplicant(new Types.ObjectId(applicantId), new Types.ObjectId(jobId));
      return response;
    },
  },

  User: {
    dogs: async (user: IUser): Promise<IDog[]> => {
      const dogs = [];
      if (user && user.dogs) {
        for (let dogId of user.dogs) {
          const dog = await res.Query.getDog(null, { id: dogId.toString() });
          dogs.push(dog);
        }
      }
      return dogs;
    },

    jobs: async (user: IUser): Promise<IJob[]> => {
      const jobs = [];
      if (user && user.jobs) {
        for (let jobId of user.jobs) {
          const job = await res.Query.getJob(null, { id: jobId.toString() });
          jobs.push(job);
        }
      }
      return jobs;
    },
    appliedTo: async (user: IUser): Promise<IJob[]> => {
      const jobs = [];
      if (user && user.appliedTo) {
        for (let jobId of user.appliedTo) {
          const job = await res.Query.getJob(null, { id: jobId.toString() });
          jobs.push(job);
        }
      }
      return jobs;
    },
    rating: (user: IUser): number | undefined => {
      if (user.ratings === undefined) {
        return undefined;
      }
      return user.ratings.reduce((a, b) => a + b) / user.ratings.length;
    },
  },

  Dog: {
    owner: async (dog: IDog): Promise<IUser> => {
      return await res.Query.getUser(null, { id: dog.owner.toString() });
    },
  },

  Job: {
    jobLocation: (job: IJob): { type: { type: string }; coordinates: number[] } => {
      return {
        type: { type: 'JobLocation' },
        coordinates: [job.jobLocation.coordinates[1], job.jobLocation.coordinates[0]],
      };
    },
    user: async (job: IJob): Promise<IUser> => {
      return await res.Query.getUser(null, { id: job.user.toString() });
    },
    dog: async (job: IJob): Promise<IDog> => {
      return await res.Query.getDog(null, { id: job.dog.toString() });
    },
    timePosted: (job: IJob): Date => {
      return job.timePosted;
    },
    startTime: (job: IJob): Date => {
      return job.startTime;
    },
    candidates: async (job: IJob): Promise<IUser[]> => {
      const users = [];
      for (let userId of job.candidates) {
        const user = await res.Query.getUser(null, { id: userId.toString() });
        users.push(user);
      }
      return users;
    },
    city: async (job: IJob): Promise<string> => {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${job.jobLocation.coordinates[1]}&longitude=${job.jobLocation.coordinates[0]}&localityLanguage=en`
      );
      const city = response.data.city;
      const region = response.data.principalSubdivision;

      return city === '' ? (region === '' ? response.data.countryName : region) : city;
    },
    locality: async (job: IJob): Promise<string> => {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${job.jobLocation.coordinates[1]}&longitude=${job.jobLocation.coordinates[0]}&localityLanguage=en`
      );
      const locality = response.data.locality;
      const country = response.data.countryName;

      return locality === '' ? country : locality;
    },
  },
};

export = res;
