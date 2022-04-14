import { useQuery } from '@apollo/client';
import { useState } from 'react';
import * as api from '../services/api.service';

import NewPostItem from '../components/NewPostItem';

const NewJobs = () => {
  // const [posts, setPosts] = useState([]);
  const { error, loading, data } = useQuery(api.getJob, { variables: { getJobId: '624f09a217720abf637965b7' } });
  // const postElements = <NewPostItem {...data.getPost}></NewPostItem>;
  if (loading) return null;
  return (
    <div className="flex justify-center pt-16">
      <div className="flex flex-col w-1/3 min-w-[450px] space-y-3">
        {/* <button
          onClick={() => {
            console.log(error);
          }}
        >
          loco
        </button> */}
        {data && <NewPostItem {...data.getJob}></NewPostItem>}
      </div>
    </div>
  );
};

export default NewJobs;
