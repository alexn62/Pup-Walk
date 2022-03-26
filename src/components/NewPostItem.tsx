import { FC } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { IoLogoUsd } from 'react-icons/io';
import MainButton from './MainButton';

interface NewPostItemProps {
  ownerName: string;
  ownerRating: number;
  // ownerProfilePhoto: string;
  dogName: string;
  dogDescription: string;
  // dogPhoto: string;
  details: string;
  mainLocation: string;
  secondaryLocation: string;
  date: string;
  duration: string;
  pickupTime: string;
  hourlyPay: number;
  totalPay: number;
}

const NewPostItem: FC<NewPostItemProps> = (props) => {
  let stars = [];
  for (let i = 0; i < Math.floor(props.ownerRating); i++) {
    stars.push(<FaStar color="orange" />);
  }
  return (
    <div className="shadow-lg rounded-2xl bg-white flex flex-col justify-between items-start p-4 space-y-3">
      <div className="w-full flex justify-end">
        <div className="flex mr-auto">
          <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full mr-2"></div>
          <div className="flex flex-col justify-between">
            <p className="font-semibold text-kBlue text-lg">{props.ownerName}</p>
            <div className="flex">{stars}</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-end justify-between">
            <p className="font-semibold text-lg">{props.dogName}</p>
            <p className="text-sm">{props.dogDescription}</p>
          </div>
          <div className="h-[48px] w-[48px] bg-kBlueLight rounded-full ml-2"></div>
        </div>

        <BsThreeDots className="ml-2 hover:cursor-pointer" />
      </div>
      <p className="font-semibold">Details</p>
      <p className="text-left">{props.details}</p>
      <div className="flex items-stretch w-full space-x-2">
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight">
          <p className="text-lg text-kBlue">{props.mainLocation}</p>
          <p className="text-kMidBlue">{props.secondaryLocation}</p>
          <HiLocationMarker color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">
            {props.date}, {props.duration}
          </p>
          <p className="text-kMidBlue">{props.pickupTime}</p>
          <HiOutlineClock color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-2xl  bg-kGreenLight">
          <p className="text-lg text-kGreen line-clamp-1">$ {props.hourlyPay} / hr</p>
          <p className="text-kMidGreen line-clamp-1">Total {props.totalPay} USD</p>
          <IoLogoUsd color="#67C73A" />
        </div>
      </div>
      <div className="flex space-x-2 w-full">
        <MainButton title="SAVE" invert={true} />
        <MainButton title="CONTACT" />
      </div>
    </div>
  );
};

export default NewPostItem;
