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
    longitude: longitude,
    latitude: latitude,
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

const deleteJob = async (id: string) => {
  await Job.deleteOne({ _id: id }).exec();
};

export { addJob, getJob, deleteJob };
