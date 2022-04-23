import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { Job } from '../interfaces/interfaces';

const MyListingsItem = ({ job }: { job: Job }) => {
  const startDate = new Date(+job.startTime);
  const startTime = startDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  });
  return (
    <div className="shadow-lg rounded-2xl bg-white flex flex-col justify-between  p-4 space-y-2">
      <div className="flex justify-between">
        <h3 className="font-bold">{job.title}</h3>
        <p>{job.dog.name}</p>
      </div>
      <p className="">{job.details}</p>
      <div className="flex justify-between">
        <p className="font-semibold">Payment due</p>
        <p>{`$ ${((job.duration / 60) * job.hourlyPay).toFixed(2)}`}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">Start time</p>
        <p>{startTime}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">Applicants</p>
        <p>{job.candidates.length}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold">Status</p>
        <div
          className={`text-center rounded-md  px-12 ${
            job.status === 'open'
              ? 'bg-green-100 text-green-500'
              : job.status === 'pending'
              ? 'bg-orange-100  text-orange-500'
              : 'bg-red-100  text-red-500'
          }`}
        >
          {job.status.toUpperCase()}
        </div>
      </div>
      <div className="flex items-stretch w-full space-x-2">
        <div className="flex flex-col items-center justify-between p-2 rounded-md  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">{job.city ?? ''}</p>
          <p className="text-kMidBlue">{job.locality ?? ''}</p>
          <HiLocationMarker color="#4971FF" />
        </div>
        <div className="flex flex-col items-center justify-between p-2 rounded-md  bg-kBlueLight flex-grow">
          <p className="text-lg text-kBlue">{`${job.duration} Minutes`}</p>
          <p className="text-kMidBlue">{startTime}</p>
          <HiOutlineClock color="#4971FF" />
        </div>
      </div>
    </div>
  );
};

export default MyListingsItem;
