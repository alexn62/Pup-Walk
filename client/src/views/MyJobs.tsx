import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import MyJobsSection from '../components/MyJobsSection';
import TopBar from '../components/TopBar';
import { Job, User } from '../interfaces/interfaces';
import * as userQueries from '../services/queries/UserQueries';
import { useAuth } from '../store/auth-context';
const MyJobs = () => {
  // SERVICES
  const auth = useAuth();

  // STATE VARIABLES
  const [myListings, setMyListings] = useState<Job[]>([]);
  const { loading, data } = useQuery<{ getUser: User }>(userQueries.getUser, {
    variables: { getUserId: auth?.currentMongoUser?.id },
  });

  useEffect(() => {
    if (data?.getUser.appliedTo) {
      setMyListings(data.getUser.appliedTo);
    }
  }, [data]);

  // FILTERS
  const successfulJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'pending' && job.acceptedUser?.id === auth?.currentMongoUser?.id)
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const myFinishedJobs = myListings
    .filter((job) => job.acceptedUser?.id === auth?.currentMongoUser?.id && job.status.toLowerCase() === 'closed')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const waitingForOwnerResponse = myListings
    .filter((job) => !job.acceptedUser && job.status.toLowerCase() === 'open')
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
      {loading && !data && <FullScreenLoadingIndicator />}
      <div className="flex flex-col items-center w-full">
        <TopBar title="My Jobs" />
        {myListings.length && (
          <div className="pt-8 pb-16 flex flex-col space-y-3 w-full">
            {successfulJobs.length > 0 && <MyJobsSection title="Upcoming Jobs" jobs={successfulJobs} />}
            {waitingForConfirmation.length > 0 && (
              <MyJobsSection title="Waiting for Confirmation" jobs={waitingForConfirmation} />
            )}
            {waitingForOwnerResponse.length > 0 && <MyJobsSection title="Applied to" jobs={waitingForOwnerResponse} />}
            {myFinishedJobs.length > 0 && <MyJobsSection title="Finished Jobs" jobs={myFinishedJobs} />}

            {closedAndExpiredJobs.length > 0 && (
              <MyJobsSection title="Closed and Expired Jobs" jobs={closedAndExpiredJobs} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobs;
