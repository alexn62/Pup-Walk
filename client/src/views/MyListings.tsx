import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import MyListingsItem from '../components/MyListingsItem';
import TopBar from '../components/TopBar';
import { Job, User } from '../interfaces/interfaces';
import * as userQueries from '../services/queries/UserQueries';
import { useAuth } from '../store/auth-context';

const MyListings = () => {
  const auth = useAuth();
  const { loading, data } = useQuery<{ getUser: User }>(userQueries.getUser, {
    variables: { getUserId: auth?.currentMongoUser?.id },
  });
  const [myListings, setMyListings] = useState<Job[]>([]);

  useEffect(() => {
    if (data?.getUser.jobs) {
      setMyListings(data.getUser.jobs);
    }
  }, [data]);

  const pendingJobs = myListings
    .filter((job) => job.status.toLowerCase() === 'pending')
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
  return (
    <>
      {loading && !data && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="My Listings"></TopBar>
        {myListings.length && (
          <div className="pt-8 pb-16 flex flex-col space-y-3 w-full">
            {pendingJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-center my-4">Pending</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {pendingJobs.map((job: Job) => (
                    <MyListingsItem key={job.id} job={job}></MyListingsItem>
                  ))}
                </div>
              </div>
            )}
            {openJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-left pl-4 my-2">Open</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {openJobs.map((job: Job) => (
                    <MyListingsItem key={job.id} job={job}></MyListingsItem>
                  ))}
                </div>
              </div>
            )}
            {closedAndExpiredJobs.length > 0 && (
              <div>
                <h3 className="font-bold text-left pl-4 my-2">Closed or expired</h3>
                <div className="flex flex-col space-y-3 w-full">
                  {closedAndExpiredJobs.map((job: Job) => (
                    <MyListingsItem key={job.id} job={job}></MyListingsItem>
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

export default MyListings;
