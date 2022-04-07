import React from 'react';
import MainButton from './MainButton';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = ({
  onTabClick,
  currentIndex,
}: {
  onTabClick: (index: number) => void;
  currentIndex: number;
}) => {
  const tabs = [
    <NavigationBarItem key="1" onTabClick={() => onTabClick(0)} title="Explore" selected={currentIndex === 0} />,
    <NavigationBarItem key="2" onTabClick={() => onTabClick(1)} title="My Jobs" selected={currentIndex === 1} />,
    <NavigationBarItem key="3" onTabClick={() => onTabClick(2)} title="My Listings" selected={currentIndex === 2} />,
    <NavigationBarItem key="4" onTabClick={() => onTabClick(3)} title="Messages" selected={currentIndex === 3} />,
    <NavigationBarItem key="5" onTabClick={() => onTabClick(4)} title="Profile" selected={currentIndex === 4} />,
  ];
  return (
    <header className="h-14 px-8 py-3 flex justify-center fixed w-screen bg-kWhiteDark">
      <div className="flex items-center mr-auto">
        <div className="h-10 w-10 rounded-full bg-kBlue mr-2 cursor-pointer"></div>
        <p className="text-kBlue font-bold cursor-pointer">DOG WALKING APP</p>
      </div>
      <div className="flex items-center space-x-2">{tabs}</div>
      <div className="ml-auto">
        <MainButton title="POST NEW JOB" />
      </div>
    </header>
  );
};

export default MainNavigationBar;
