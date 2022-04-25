import { useEffect, useState } from 'react';
import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { Job } from '../interfaces/interfaces';
import MainButton from './MainButton';

const MyJobsItem = ({ job }: { job: Job }) => {
  const [thisJob, setThisJob] = useState<Job>();

  useEffect(() => {
    if (job) {
      setThisJob(job);
    }
  }, [job]);
  const startDate = new Date(+job.startTime);
  const startTime = startDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  });
  return (
    <>
      {thisJob && (
        <div className="shadow-lg rounded-2xl bg-white flex flex-col justify-between  p-4 space-y-2">
          <div className="flex justify-between">
            <div className="flex justify-between">
              <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full mr-2 overflow-hidden">
                <img
                  src={
                    job.user.profilePhoto ??
                    'https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80'
                  }
                  alt={job.user.firstName}
                  className="object-cover h-full"
                ></img>
              </div>
              <p className="font-semibold text-kBlue text-lg">{`${job.user.firstName}`}</p>
            </div>
            <div className="flex">
              <div className="flex flex-col items-end justify-between">
                <p className="font-semibold text-lg">{job.dog.name}</p>
                <p className="text-sm">{`${job.dog.age} y/o, ${job.dog.breed}`}</p>
              </div>
              <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full ml-2 overflow-hidden">
                <img src={job.dog.dogPhoto} alt="" className="object-cover h-full"></img>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-kBlue">{thisJob.title}</h3>
          <p className="">{thisJob.details}</p>
          <div className="flex justify-between">
            <p className="font-semibold">Expected Payout</p>
            <p>{`$ ${((thisJob.duration / 60) * thisJob.hourlyPay).toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Start time</p>
            <p>{startTime}</p>
          </div>
          {thisJob.acceptedUser && (
            <div className="flex justify-between">
              <p className="font-semibold">Accepted walker</p>
              <div key={thisJob.acceptedUser.firstName} className="flex font-semibold justify-between my-1">
                <div className="flex justify-start space-x-2 items-center">
                  <div>{thisJob.acceptedUser.firstName}</div>
                  <div className="w-6 h-6 rounded-full bg-kBlueLight"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="font-semibold">Status</p>
            <div
              className={`text-center rounded-md  px-12 ${
                thisJob.status === 'open' || thisJob.status === 'closed'
                  ? 'bg-green-100 text-green-500'
                  : thisJob.status === 'finished' || thisJob.status === 'pending'
                  ? 'bg-orange-100  text-orange-500'
                  : 'bg-red-100  text-red-500'
              }`}
            >
              {thisJob.status.toUpperCase()}
            </div>
          </div>
          <div className="flex items-stretch w-full space-x-2">
            <div className="flex flex-col items-center justify-between p-2 rounded-md  bg-kBlueLight flex-grow">
              <p className="text-lg text-kBlue">{thisJob.city ?? ''}</p>
              <p className="text-kMidBlue">{thisJob.locality ?? ''}</p>
              <HiLocationMarker color="#4971FF" />
            </div>
            <div className="flex flex-col items-center justify-between p-2 rounded-md  bg-kBlueLight flex-grow">
              <p className="text-lg text-kBlue">{`${thisJob.duration} Minutes`}</p>
              <p className="text-kMidBlue">{startTime}</p>
              <HiOutlineClock color="#4971FF" />
            </div>
          </div>
          <div className="flex space-x-2 w-full ">
            <MainButton title="CANCEL" invert={true} />

            <MainButton
              title="FINISH"
              // loading={loading && !data}
              // disabled={loading && !data}
              onClick={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobsItem;
