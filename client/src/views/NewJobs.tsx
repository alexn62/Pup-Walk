import { useQuery } from '@apollo/client';
import * as api from '../services/api.service';

import NewPostItem from '../components/NewPostItem';
import TopBar from '../components/TopBar';
import { Job } from '../interfaces/interfaces';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';

const NewJobs = () => {
  const { error, loading, data } = useQuery(api.getJobsNearby, {
    variables: { maxDistance: 10000, startingPoint: [13.37, 52.51] },
  });
  return (
    <>
      {loading && !data?.getJobsNearby && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="New Jobs"></TopBar>
        <div className="flex flex-col space-y-3 pt-8 w-full">
          {data && data.getJobsCloseBy.map((job: Job) => <NewPostItem {...job} key={job.id}></NewPostItem>)}
        </div>
      </div>
    </>
  );
};

export default NewJobs;
