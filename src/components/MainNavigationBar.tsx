import MainButton from './MainButton';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = () => {
  return (
    <header className="h-14 px-8 py-3 flex justify-between items-center self-start mb-auto ">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-kBlue mr-2 cursor-pointer"></div>
        <p className="text-kBlue font-bold cursor-pointer">DOG WALKING APP</p>
      </div>
      <div className="flex items-center w-1/3">
        <NavigationBarItem title="New Jobs" selected={true} />
        <NavigationBarItem title="My Jobs" selected={false} />
        <NavigationBarItem title="Messages" selected={false} />
        <NavigationBarItem title="Profile" selected={false} />
      </div>
      <div className="flex items-center">
        <MainButton title="POST NEW JOB" />
      </div>
    </header>
  );
};

export default MainNavigationBar;
