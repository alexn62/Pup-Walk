import { FC } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { Job } from '../interfaces/interfaces';
import MainButton from './MainButton';

const NewPostItem: FC<Job> = (job: Job) => {
  const startDate = new Date(+job.startTime);
  const startTime = startDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  });
  const user = job.user;
  const dog = job.dog;
  let stars = [];
  for (let i = 0; i < Math.floor(3); i++) {
    stars.push(<FaStar key={i} color="orange" />);
  }
  return (
    <div className="shadow-lg rounded-2xl bg-white flex flex-col justify-between  p-4 space-y-3">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full mr-2 overflow-hidden">
            <img
              src={
                user.profilePhoto ??
                'https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80'
              }
              alt={user.firstName}
              className="object-cover h-full"
            ></img>
          </div>
          <div className="flex flex-col justify-between items-start">
            <p className="font-semibold text-kBlue text-lg">{`${user.firstName}`}</p>
            <div className="flex">{stars}</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-end justify-between">
            <p className="font-semibold text-lg">{dog.name}</p>
            <p className="text-sm">{`${dog.age} y/o, ${dog.breed}`}</p>
          </div>
          <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full ml-2 overflow-hidden">
            <img src={dog.dogPhoto} alt="" className="object-cover h-full"></img>
          </div>
        </div>
      </div>
      <p className="font-semibold">Details</p>
      <p className="text-left">{job.details}</p>
      <div className="flex items-stretch w-full space-x-2">
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">{job.city ?? ''}</p>
          <p className="text-kMidBlue">{job.locality ?? ''}</p>
          <HiLocationMarker color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">{`${job.duration} Minutes`}</p>
          <p className="text-kMidBlue">{startTime}</p>
          <HiOutlineClock color="#4971FF" />
        </div>
      </div>
      <div className="w-full flex items-center justify-between  ">
        <p className="rounded-2xl p-2 bg-kGreenLight text-lg text-kGreen line-clamp-1 text-center">
          $ {job.hourlyPay} / hr
        </p>
        <p className="ml-auto line-clamp-1 text-right font-bold ">
          Projected Total: {(job.hourlyPay * job.duration) / 60} USD
        </p>
      </div>
      <div className="flex space-x-2 w-full">
        <MainButton title="SAVE" invert={true} />
        <MainButton title="APPLY" />
      </div>
    </div>
  );
};

export default NewPostItem;
