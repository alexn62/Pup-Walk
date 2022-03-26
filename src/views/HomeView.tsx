import MainNavigationBar from '../components/MainNavigationBar';
import NewPostItem from '../components/NewPostItem';
const HomeView = () => {
  const mockPost = {
    ownerName: 'John Doe',
    ownerRating: 3,
    // ownerProfilePhoto: string,
    dogName: 'Frankie',
    dogDescription: 'Good dog',
    // dogPhoto: string,
    details: 'Test detailss',
    mainLocation: 'Berlin',
    secondaryLocation: 'Friedrichshain',
    date: 'Today',
    duration: '1 hr',
    pickupTime: 'Today: 14:35',
    hourlyPay: 18,
    totalPay: 18,
  };
  return (
    <div>
      <MainNavigationBar />
      <div className="flex justify-center ">
        <div className="flex flex-col w-1/3 min-w-[450px]">
          <NewPostItem {...mockPost}></NewPostItem>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
