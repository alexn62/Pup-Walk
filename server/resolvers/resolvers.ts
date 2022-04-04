import * as dogQueries from '../database/queries/dogQueries';
import * as userQueries from '../database/queries/userQueries';
import * as jobQueries from '../database/queries/jobQueries';

import { Dog } from '../interfaces/dog-interface';
import { User } from '../interfaces/user-interface';
import { Job } from '../interfaces/job-interface';

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

const res = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<User> => {
      const user = await userQueries.getUser(id);
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    },
    getDog: async (_: any, { id }: { id: String }): Promise<Dog> => {
      const dog = await dogQueries.getDog(id);
      if (!dog) {
        throw new Error('Dog not found.');
      }
      return dog;
    },
    getJob: async (_: any, { id }: { id: string }): Promise<Job> => {
      const job = await jobQueries.getJob(id);
      if (!job) {
        throw new Error('Job not found.');
      }
      return job;
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
      const response = await dogQueries.addDog(owner, name, age, sex, breed, description, dateAdded);

      return response;
    },
    addJob: async (
      _: any,
      { user, dog, details, longitude, title, latitude, duration, hourlyPay, startTime }: AddJobInput
    ) => {
      const response = await jobQueries.addJob(
        user,
        dog,
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
  },

  User: {
    dogs: async (user: any) => {
      const dogs = [];
      for (let dogId of user.dogs) {
        const dog = await res.Query.getDog(null, { id: dogId });
        dogs.push(dog);
      }
      return dogs;
    },
    jobs: async (user: any) => {
      const jobs = [];
      for (let jobId of user.jobs) {
        // console.log({ jobId });
        const job = await res.Query.getJob(null, { id: jobId });
        jobs.push(job);
      }
      return jobs;
    },
  },

  Dog: {
    owner: async (dog: any) => {
      return await res.Query.getUser(null, { id: dog.owner });
    },
  },

  Job: {
    location: (job: any) => {
      return {
        latitude: job.latitude,
        longitude: job.longitude,
      };
    },
    user: async (job: any) => {
      return await res.Query.getUser(null, { id: job.user });
    },
    dog: async (job: any) => {
      return await res.Query.getDog(null, { id: job.dog });
    },
    timePosted: (job: any) => {
      return job.timePosted.toString();
    },
    startTime: (job: any) => {
      return job.startTime.toString();
    },
  },
};

export = res;
