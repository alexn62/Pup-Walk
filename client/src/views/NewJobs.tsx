import { useQuery } from '@apollo/client';
import * as api from '../services/api.service';

import NewPostItem from '../components/NewPostItem';
import TopBar from '../components/TopBar';

const NewJobs = () => {
  // const [posts, setPosts] = useState([]);
  const { /*error,*/ loading, data } = useQuery(api.getJob, { variables: { getJobId: '624f09a217720abf637965b7' } });
  // const postElements = <NewPostItem {...data.getPost}></NewPostItem>;
  if (loading) return null;
  return (
    <div className="flex flex-col items-center">
      <TopBar title="New Jobs"></TopBar>
      <div className="flex flex-col space-y-3 pt-8">{data && <NewPostItem {...data.getJob}></NewPostItem>}</div>
    </div>
  );
};

export default NewJobs;
