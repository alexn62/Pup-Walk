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

const _getUser = async (server, userId) => {
  return await server.executeOperation({ query: testQueries.getUserWithJobs, variables: { getUserId: userId } });
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
      expect(result.data.addUser).to.eql(user);
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
      expect(res.data.getUser).to.eql(user);
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
      expect(res.data.getUser).to.eql(user);
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
    it.only('addJob() should add a job to user', async () => {
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
  });
});
