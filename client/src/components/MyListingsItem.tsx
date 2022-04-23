import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { HiLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { Job } from '../interfaces/interfaces';

// const applicants = [
//   { firstName: 'Alex' },
//   { firstName: 'Mich' },
//   { firstName: 'Franks' },
//   { firstName: 'Al;lkex' },
//   { firstName: 'Mil;kch' },
//   // { firstName: 'Frjjanks' },
//   // { firstName: 'Alejx' },
//   // { firstName: 'Micjljh' },
//   // { firstName: 'Frakjnnks' },
//   // { firstName: 'Ankllex' },
//   // { firstName: 'Mlknich' },
//   { firstName: 'Fr anks' },
// ];

const MyListingsItem = ({ job }: { job: Job }) => {
  const [thisJob, setThisJob] = useState<Job>();
  const [showApplicants, setShowApplicants] = useState(false);
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
            <h3 className="font-bold text-kBlue">{thisJob.title}</h3>
            <p>{thisJob.dog.name}</p>
          </div>
          <p className="">{thisJob.details}</p>
          <div className="flex justify-between">
            <p className="font-semibold">Payment due</p>
            <p>{`$ ${((thisJob.duration / 60) * thisJob.hourlyPay).toFixed(2)}`}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Start time</p>
            <p>{startTime}</p>
          </div>
          <div className="flex justify-between space-x-2">
            <p className="font-semibold mr-auto">Applicants</p>
            <p>{thisJob.candidates.length}</p>
            <button
              onClick={() => {
                setShowApplicants((prev) => !prev);
              }}
              className={`text-kBlue px-2 border border-kBlue bg-white rounded-md transition-all disabled:text-gray-400 disabled:border-gray-400`}
              disabled={thisJob.candidates.length === 0}
            >
              {showApplicants ? 'Hide' : 'Show'}
            </button>
          </div>

          <div
            className={`relative  overflow-scroll px-3 flex flex-col  rounded-md transition-all duration-200 ${
              showApplicants ? 'max-h-48' : 'max-h-0'
            }`}
          >
            <div className="w-full bg-gradient-to-b from-white to-transparent min-h-[12px] sticky top-0 left-0"></div>
            {thisJob.candidates.map((applicant) => (
              <div key={applicant.firstName} className="flex font-semibold justify-between my-1">
                <div className="flex justify-start space-x-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-kBlueLight"></div>
                  <div>{applicant.firstName}</div>
                </div>
                <div className="flex justify-end space-x-2">
                  <FontAwesomeIcon
                    className="px-3 py-1 bg-red-500 rounded-md"
                    color="white"
                    icon={faXmark}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="px-6 py-1 bg-green-500 rounded-md"
                    color="white"
                    icon={faCheck}
                  ></FontAwesomeIcon>
                </div>
              </div>
            ))}
            <div className="w-full bg-gradient-to-b from-transparent to-white min-h-[12px] sticky bottom-0 left-0"></div>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold">Status</p>
            <div
              className={`text-center rounded-md  px-12 ${
                thisJob.status === 'open'
                  ? 'bg-green-100 text-green-500'
                  : thisJob.status === 'pending'
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
        </div>
      )}
    </>
  );
};

export default MyListingsItem;
