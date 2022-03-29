import NewPostItem from '../components/NewPostItem';
import mockPosts from '../mockData/mockPosts';

const MyJobs = () => {
  const posts = mockPosts;
  const postElements = posts.map((el) => <NewPostItem {...el}></NewPostItem>);
  return (
    <div className="flex justify-center pt-16">
        <div className="flex flex-col w-1/3 min-w-[450px] space-y-3">
          {postElements}
        </div>
      </div>
  )
}

export default MyJobs