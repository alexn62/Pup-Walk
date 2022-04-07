import { FC } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { IoLogoUsd } from 'react-icons/io';
import { Job } from '../interfaces/interfaces';
import MainButton from './MainButton';

// interface NewPostItemProps {
//   ownerName: string;
//   ownerRating: number;
//   ownerProfilePhoto: string;
//   dogName: string;
//   dogDescription: string;
//   dogPhoto: string;
//   details: string;
//   mainLocation: string;
//   secondaryLocation: string;
//   date: string;
//   duration: string;
//   pickupTime: string;
//   hourlyPay: number;
//   totalPay: number;
// }

const NewPostItem: FC<Job> = (job: Job) => {
  const user = job.user;
  const dog = job.dog;
  let stars = [];
  for (let i = 0; i < Math.floor(3); i++) {
    stars.push(<FaStar key={i} color="orange" />);
  }
  return (
    <div className="shadow-lg rounded-2xl bg-white flex flex-col justify-between items-start p-4 space-y-3">
      <div className="w-full flex justify-end">
        <div className="flex mr-auto">
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
            <p className="font-semibold text-kBlue text-lg">{`${user.firstName} ${
              user.middleName ? user.middleName : ''
            } ${user.lastName}`}</p>
            <div className="flex">{stars}</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-end justify-between">
            <p className="font-semibold text-lg">{dog.name}</p>
            <p className="text-sm">{dog.age}y/o</p>
          </div>
          <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full ml-2 overflow-hidden">
            <img src={dog.dogPhoto} alt="" className="object-cover h-full"></img>
          </div>
        </div>
        <BsThreeDots className="ml-2 hover:cursor-pointer" />
      </div>
      <p className="font-semibold">Details</p>
      <p className="text-left">{job.details}</p>
      <div className="flex items-stretch w-full space-x-2">
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight">
          <p className="text-lg text-kBlue">{'props.mainLocation'}</p>
          <p className="text-kMidBlue">{'props.secondaryLocation'}</p>
          <HiLocationMarker color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">
            {'props.date'}, {job.duration / 60}hrs
          </p>
          <p className="text-kMidBlue">{job.startTime}</p>
          <HiOutlineClock color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kGreenLight">
          <p className="text-lg text-kGreen line-clamp-1">$ {job.hourlyPay} / hr</p>
          <p className="text-kMidGreen line-clamp-1">Total {(job.hourlyPay * job.duration) / 60} USD</p>
          <IoLogoUsd color="#67C73A" />
        </div>
      </div>
      <div className="flex space-x-2 w-full">
        <MainButton title="SAVE" invert={true} />
        <MainButton title="APPLY" />
      </div>
    </div>
  );
};

export default NewPostItem;
