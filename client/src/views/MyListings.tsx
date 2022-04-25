import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import FullScreenLoadingIndicator from '../components/Shared/FullScreenLoadingIndicator';
import TopBar from '../components/Shared/TopBar';
import { Job, User } from '../interfaces/interfaces';
import * as userQueries from '../services/queries/UserQueries';
import { useAuth } from '../store/auth-context';
import MyListingsSection from '../components/MyListings/MyListingsSection';

const MyListings = () => {
  // SERVICES
  const auth = useAuth();

  // STATE VARIABLES
  const [myListings, setMyListings] = useState<Job[]>([]);
  const { loading, data } = useQuery<{ getUser: User }>(userQueries.getUser, {
    variables: { getUserId: auth?.currentMongoUser?.id },
  });

  // FILTERS
  const pendingJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'pending')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const finishedJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'finished')
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const openJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'open' && Number(job.startTime) > Date.now())
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  const closedAndExpiredJobs = myListings
    .filter(
      (job) =>
        job.status.toLowerCase() === 'closed' ||
        (Number(job.startTime) < Date.now() && job.status.toLowerCase() !== 'pending')
    )
    .sort((prev, curr) => Number(prev.startTime) - Number(curr.startTime));

  // USEEFFECT
  useEffect(() => {
    if (data?.getUser.jobs) {
      setMyListings(data.getUser.jobs);
    }
  }, [data]);
  return (
    <>
      {loading && !data && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="My Listings"></TopBar>
        {myListings.length && (
          <div className="pt-8 pb-16 flex flex-col space-y-3 w-full">
            {finishedJobs.length > 0 && <MyListingsSection title="Marked as Finished" jobs={finishedJobs} />}
            {pendingJobs.length > 0 && <MyListingsSection title="Pending" jobs={pendingJobs} />}
            {openJobs.length > 0 && <MyListingsSection title="Open Jobs" jobs={openJobs} />}
            {closedAndExpiredJobs.length > 0 && (
              <MyListingsSection title="Closed and Expired" jobs={closedAndExpiredJobs} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyListings;
