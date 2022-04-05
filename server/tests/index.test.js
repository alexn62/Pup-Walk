const { ApolloServer } = require('apollo-server');
const { mongoose } = require('mongoose');
const resolvers = require('../resolvers/resolvers');
const typeDefs = require('../typedefs/typedefs');
const { Dog } = require('../database/schemas/dogSchema');
const { User } = require('../database/schemas/userSchema');
const { Job } = require('../database/schemas/jobSchema');

const testQueries = require('./testQueries');
const userMocks = require('./mocks/users');
const dogMocks = require('./mocks/dogs');
const jobMocks = require('./mocks/jobs');
const { expect } = require('chai');
require('mocha');

const DATABASE_NAME = 'test';
const url = `mongodb://localhost:27017/${DATABASE_NAME}`;
const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const _addMockUser = async (server, user) => {
  return await server.executeOperation({
    query: testQueries.addUser,
    variables: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      sex: user.sex,
    },
  });
};
const _addMockDog = async (server, dog) => {
  return await server.executeOperation({
    query: testQueries.addDog,
    variables: {
      name: dog.name,
      sex: dog.sex,
      age: dog.age,
      breed: dog.breed,
      description: dog.description,
      owner: dog.ownerId,
    },
  });
};
const _addMockJob = async (server, job) => {
  return await server.executeOperation({
    query: testQueries.addJob,
    variables: {
      user: job.userId,
      dog: job.dogId,
      details: job.details,
      latitude: job.location.latitude,
      longitude: job.location.longitude,
      duration: job.duration,
      hourlyPay: job.hourlyPay,
      startTime: job.startTime,
      title: job.title,
      status: job.status,
    },
  });
};

const _getJobsCloseBy = async (server, startingPoint, maxDistance) => {
  return await server.executeOperation({
    query: testQueries.getJobsCloseBy,
    variables: {
      startingPoint: startingPoint,
      maxDistance: maxDistance,
    },
  });
};

const _deleteJob = async (server, userId, jobId) => {
  return await server.executeOperation({ query: testQueries.deleteJob, variables: { userId: userId, jobId: jobId } });
};

const _getUser = async (server, userId) => {
  return await server.executeOperation({ query: testQueries.getUserWithJobs, variables: { getUserId: userId } });
};
const _getJob = async (server, jobId) => {
  return await server.executeOperation({ query: testQueries.getJob, variables: { getJobId: jobId } });
};

const _applyForJob = async (server, applicantId, jobId) => {
  return await server.executeOperation({
    query: testQueries.applyForJob,
    variables: { applicantId: applicantId, jobId: jobId },
  });
};

describe('Resolver Tests', () => {
  beforeAll(async () => {
    if (url.substring(url.length - 4) !== 'test') {
      throw new Error('WRONG DB');
    } else {
      await mongoose.connect(url);
    }
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('User Resolver Tests', () => {
    afterEach(async () => {
      await User.deleteMany();
    });

    it('Testing suite should be set up', () => {
      expect(true).to.equal(true);
    });

    it('addUser() Should add User to DB without errors', async () => {
      const user = { ...userMocks.mockUser };
      const result = await _addMockUser(testServer, user);
      expect(result.errors).to.equal(undefined);
      user.id = result.data.addUser.id;
      expect(result.data.addUser.firstName).to.eql(user.firstName);
    });

    it('getUser() Should get User from DB without errors', async () => {
      const user = { ...userMocks.mockUser };
      const result = await _addMockUser(testServer, user);

      user.id = result.data.addUser.id;
      const res = await testServer.executeOperation({
        query: testQueries.getUser,
        variables: {
          getUserId: result.data.addUser.id,
        },
      });
      expect(res.data.getUser.firstName).to.eql(user.firstName);
    });

    it('getUser() return an error if no user found with id', async () => {
      const user = { ...userMocks.mockUser };
      await _addMockUser(testServer, user);

      const res = await testServer.executeOperation({
        query: testQueries.getUser,
        variables: {
          getUserId: '41224d776a326fb40f000001',
        },
      });
      expect(res.errors[0].message).to.equal('User not found.');
    });

    it('getUser() be able to show nested owned dogs', async () => {
      const user = { ...userMocks.mockUser };
      const result = await _addMockUser(testServer, user);

      user.id = result.data.addUser.id;
      const dog = { ...dogMocks.mockDog };
      dog.ownerId = user.id;
      await _addMockDog(testServer, dog);

      const res = await testServer.executeOperation({
        query: testQueries.getUserWithDogs,
        variables: {
          getUserId: result.data.addUser.id,
        },
      });
      user.dogs = [{ name: 'Frankie' }];
      expect(res.data.getUser.dogs[0].name).to.eql(user.dogs[0].name);
    });
  });

  describe('Dog Resolver Tests', () => {
    afterEach(async () => {
      await Dog.deleteMany();
      await User.deleteMany();
    });

    it('Testing suite should be set up', () => {
      expect(true).to.equal(true);
    });

    it('addDog() Should add User to DB without errors', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const result = await _addMockDog(testServer, dog);
      expect(result.errors).to.equal(undefined);
      dog.id = result.data.addDog.id;
      delete dog.ownerId;
      expect(result.data.addDog).to.eql(dog);
    });

    it('getDog() should get a single user', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const result = await _addMockDog(testServer, dog);
      dog.id = result.data.addDog.id;

      const res = await testServer.executeOperation({
        query: testQueries.getDog,
        variables: {
          getDogId: result.data.addDog.id,
        },
      });
      delete dog.ownerId;

      expect(res.data.getDog).to.eql(dog);
    });

    it('getDog() return an error if no dog found with id', async () => {
      const res = await testServer.executeOperation({
        query: testQueries.getDog,
        variables: {
          getDogId: '41224d776a326fb40f000001',
        },
      });
      expect(res.errors[0].message).to.equal('Dog not found.');
    });
    it('getDog() should get the nested owner', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const result = await _addMockDog(testServer, dog);
      dog.id = result.data.addDog.id;

      const res = await testServer.executeOperation({
        query: testQueries.getDogWithOwner,
        variables: {
          getDogId: result.data.addDog.id,
        },
      });
      delete dog.ownerId;
      dog.owner = { firstName: 'John' };
      expect(res.data.getDog).to.eql(dog);
    });
  });
  describe('Job Resolver Tests', () => {
    afterEach(async () => {
      await Dog.deleteMany();
      await User.deleteMany();
      await Job.deleteMany();
    });

    it('Testing suite should be set up', () => {
      expect(true).to.equal(true);
    });
    it('addJob() should add a job to the database', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const job = { ...jobMocks.mockJob };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      const result = await _addMockJob(testServer, job);
      job.id = result.data.addJob.id;
      job.user = { ...userMocks.mockUser };
      job.dog = { ...dogMocks.mockDog };
      const received = result.data.addJob;
      expect(received.details).to.eql(job.details);
      expect(received.title).to.eql(job.title);
      expect(received.location).to.eql(job.location);
      expect(received.hourlyPay).to.eql(job.hourlyPay);
      expect(received.status.toLowerCase()).to.eql(job.status);
      expect(received.user.firstName).to.eql(job.user.firstName);
      expect(received.dog.name).to.eql(job.dog.name);
    });
    it('addJob() should add a job to user', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const job = { ...jobMocks.mockJob };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      await _addMockJob(testServer, job);
      const receivedUser = await _getUser(testServer, userResult.data.addUser.id);
      expect(receivedUser.data.getUser.jobs[0].title).to.eql(job.title);
    });
    it('deleteJob() should delete the job from the user', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const job = { ...jobMocks.mockJob };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      const addedJob = await _addMockJob(testServer, job);
      job.id = addedJob.data.addJob.id;
      const receivedUser = await _getUser(testServer, userResult.data.addUser.id);
      expect(receivedUser.data.getUser.jobs.map((job) => job.id)).to.include(job.id);
      await _deleteJob(testServer, job.userId, job.id);
      const newUser = await _getUser(testServer, userResult.data.addUser.id);
      expect(newUser.data.getUser.jobs.map((job) => job.id)).to.not.include(job.id);
    });
    it('deleteJob() should delete the job from db', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const job = { ...jobMocks.mockJob };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      const addedJob = await _addMockJob(testServer, job);
      job.id = addedJob.data.addJob.id;
      const receivedJob = await _getJob(testServer, job.id);
      expect(receivedJob.data.getJob.id).to.eql(job.id);
      await _deleteJob(testServer, job.userId, job.id);
      const newJob = await _getJob(testServer, job.id);
      expect(newJob.errors[0].message).to.equal('Job not found.');
    });
    it('getJobsCloseBy() should return the jobs in a given radius', async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const job = { ...jobMocks.mockJob };
      const job2 = { ...jobMocks.mockJob2 };
      const userResult = await _addMockUser(testServer, user);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      job2.userId = userResult.data.addUser.id;
      job2.dogId = dogResult.data.addDog.id;
      await _addMockJob(testServer, job);
      await _addMockJob(testServer, job2);
      const result = await _getJobsCloseBy(testServer, [job.location.longitude, job.location.latitude], 10000000);
      expect(result.data.getJobsCloseBy.length).to.greaterThan(1);
      const result2 = await _getJobsCloseBy(testServer, [job.location.longitude, job.location.latitude], 10);
      expect(result2.data.getJobsCloseBy.length).to.equal(1);
    });
    it("applyForJob() should add user to job's applicants and job to user's appliedTo", async () => {
      const dog = { ...dogMocks.mockDog };
      const user = { ...userMocks.mockUser };
      const user2 = { ...userMocks.mockUser2 };
      const job = { ...jobMocks.mockJob };
      const userResult = await _addMockUser(testServer, user);
      const userResult2 = await _addMockUser(testServer, user2);
      dog.ownerId = userResult.data.addUser.id;
      const dogResult = await _addMockDog(testServer, dog);
      job.userId = userResult.data.addUser.id;
      job.dogId = dogResult.data.addDog.id;
      const jobResult = await _addMockJob(testServer, job);
      await _applyForJob(testServer, userResult2.data.addUser.id, jobResult.data.addJob.id);
      const result = await _getJob(testServer, jobResult.data.addJob.id);
      expect(result.data.getJob.candidates.map((can) => can.id).includes(userResult2.data.addUser.id)).to.be.true;
      expect(result.data.getJob.candidates.map((can) => can.id).includes('fake')).to.be.false;
      const userRes = await _getUser(testServer, userResult2.data.addUser.id);
      console.log(userRes);
      expect(userRes.data.getUser.appliedTo.map((job) => job.id).includes(jobResult.data.addJob.id)).to.be.true;
      expect(userRes.data.getUser.appliedTo.map((job) => job.id).includes('fake')).to.be.false;
    });
  });
});
