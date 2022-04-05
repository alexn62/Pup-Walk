import { Job } from '../schemas/jobSchema';
import { getUser } from './userQueries';

const addJob = async (
  user: string,
  dog: string,
  title: string,
  details: string,
  longitude: number,
  latitude: number,
  duration: number,
  hourlyPay: number,
  startTime: string
) => {
  const newJob = new Job({
    user: user,
    dog: dog,
    title: title,
    details: details,
    location: { type: 'Point', coordinates: [longitude, latitude] },
    // longitude: longitude,
    // latitude: latitude,
    duration: duration,
    hourlyPay: hourlyPay,
    startTime: Date.parse(startTime),
  });
  const job = await newJob.save();
  const jobCreator = await getUser(user);
  jobCreator.jobs.push(job._id.toString());
  await jobCreator.save();
  return job;
};

const getJob = async (id: string): Promise<any> => {
  const job = await Job.findOne({ _id: id }).exec();
  return job;
};

const getJobsCloseBy = async (startingPoint: number[], maxDistance: number) => {
  const jobs = await Job.find({
    location: {
      $near: {
        $maxDistance: maxDistance,
        $geometry: {
          type: 'Point',
          coordinates: startingPoint,
        },
      },
    },
  });
  return jobs;
};

const deleteJob = async (id: string) => {
  await Job.deleteOne({ _id: id }).exec();
};

const addApplicant = async (applicantId: string, jobId: string) => {
  const job = await getJob(jobId);
  if (!job.candidates.includes(applicantId)) {
    job.candidates.push(applicantId);
    return await job.save();
  }
};

export { addJob, getJob, deleteJob, getJobsCloseBy, addApplicant };
