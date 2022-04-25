import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import MyJobsItem from '../components/MyJobsItem';
import TopBar from '../components/TopBar';
import { Job, User } from '../interfaces/interfaces';
import * as userQueries from '../services/queries/UserQueries';
import { useAuth } from '../store/auth-context';
const MyJobs = () => {
  const auth = useAuth();
  const { loading, data } = useQuery<{ getUser: User }>(userQueries.getUser, {
    variables: { getUserId: auth?.currentMongoUser?.id },
  });
  const [myListings, setMyListings] = useState<Job[]>([]);

  useEffect(() => {
    if (data?.getUser.appliedTo) {
      setMyListings(data.getUser.appliedTo);
    }
  }, [data]);

  const successfulJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'pending' && job.acceptedUser?.id === auth?.currentMongoUser?.id)
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const myFinishedJobs = myListings
    .filter((job) => job.acceptedUser?.id === auth?.currentMongoUser?.id && job.status.toLowerCase() === 'closed')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const waitingForOwnerResponse = myListings
    .filter((job) => !job.acceptedUser && job.status.toLowerCase() === 'pending')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const waitingForConfirmation = myListings
    .filter((job) => job.acceptedUser && job.status.toLowerCase() === 'finished')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const closedAndExpiredJobs = myListings
    .filter(
      (job) =>
        job.acceptedUser?.id !== auth?.currentMongoUser?.id &&
        (job.status.toLowerCase() === 'closed' || Number(job.startTime) < Date.now())
    )
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));
  return (
    <>
      {loading && !data && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="My Jobs"></TopBar>
        {myListings.length && (
          <div className="pt-8 pb-16 flex flex-col space-y-3 w-full">
            {successfulJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-center my-4">Upcoming Jobs</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {successfulJobs.map((job: Job) => (
                    <MyJobsItem key={job.id} job={job}></MyJobsItem>
                  ))}
                </div>
              </div>
            )}
            {waitingForConfirmation.length > 0 && (
              <div>
                <h3 className="font-bold text-center my-4">Finished and waiting for owner confirmation</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {waitingForConfirmation.map((job: Job) => (
                    <MyJobsItem key={job.id} job={job}></MyJobsItem>
                  ))}
                </div>
              </div>
            )}
            {waitingForOwnerResponse.length > 0 && (
              <div>
                <h3 className="font-bold text-center my-4">Applied to</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {waitingForOwnerResponse.map((job: Job) => (
                    <MyJobsItem key={job.id} job={job}></MyJobsItem>
                  ))}
                </div>
              </div>
            )}
            {myFinishedJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-center my-4">Finished Jobs</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {myFinishedJobs.map((job: Job) => (
                    <MyJobsItem key={job.id} job={job}></MyJobsItem>
                  ))}
                </div>
              </div>
            )}

            {closedAndExpiredJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-left pl-4 my-2">Closed or expired</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {closedAndExpiredJobs.map((job: Job) => (
                    <MyJobsItem key={job.id} job={job}></MyJobsItem>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobs;
