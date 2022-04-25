import { Job } from '../schemas/jobSchema';
import { getUser } from './userQueries';
import { Types, HydratedDocument } from 'mongoose';
import { IJob } from '../../interfaces/job-interface';

const addJob = async (
  user: Types.ObjectId,
  dog: Types.ObjectId,
  title: string,
  details: string,
  longitude: number,
  latitude: number,
  duration: number,
  hourlyPay: number,
  startTime: string
): Promise<HydratedDocument<IJob | null>> => {
  const newJob = new Job({
    user: user,
    dog: dog,
    title: title,
    details: details,
    jobLocation: { type: 'Point', coordinates: [longitude, latitude] },
    duration: duration,
    hourlyPay: hourlyPay,
    startTime: Date.parse(startTime),
  });
  const job = await newJob.save();
  const jobCreator = await getUser(user);
  jobCreator?.jobs?.push(job._id);
  await jobCreator?.save();
  return job;
};

const getJob = async (id: Types.ObjectId): Promise<HydratedDocument<IJob> | null> => {
  const job = await Job.findOne({ _id: id });
  return job;
};

const getJobsCloseBy = async (
  startingPoint: number[],
  maxDistance: number
): Promise<HydratedDocument<IJob>[] | null> => {
  const jobs = await Job.find({
    jobLocation: {
      $near: {
        $maxDistance: maxDistance,
        $geometry: {
          type: 'Point',
          coordinates: startingPoint,
        },
      },
    },
    startTime: { $gte: new Date().setDate(new Date().getDate() - 1) },
  }).sort({ startTime: 1 });

  return jobs;
};

const deleteJob = async (id: Types.ObjectId) => {
  return await Job.deleteOne({ _id: id });
};

const addApplicant = async (
  applicantId: Types.ObjectId,
  jobId: Types.ObjectId
): Promise<HydratedDocument<IJob> | null | undefined> => {
  const job = await getJob(jobId);
  if (!job?.candidates.includes(applicantId)) {
    job?.candidates.push(applicantId);
    return await job?.save();
  }
  return null;
};

const acceptApplication = async (
  applicantId: Types.ObjectId,
  jobId: Types.ObjectId
): Promise<HydratedDocument<IJob> | null | undefined> => {
  console.log('called');
  const job = await getJob(jobId);
  console.log(job);
  if (job) {
    job.status = 'pending';
    job.acceptedUser = applicantId;
    return await job.save();
  } else {
    return null;
  }
};

export { addJob, getJob, deleteJob, getJobsCloseBy, addApplicant, acceptApplication };
