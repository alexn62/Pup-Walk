import React from 'react';
import MainButton from './MainButton';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = ({onTabClick, currentIndex}: {onTabClick: (index:number)=>void, currentIndex: number}) => {
  const tabs = [
    <NavigationBarItem onTabClick={() => onTabClick(0)} title="New Jobs" selected={currentIndex === 0} />,
    <NavigationBarItem onTabClick={() => onTabClick(1)} title="My Jobs" selected={currentIndex === 1} />,
    <NavigationBarItem onTabClick={() => onTabClick(2)} title="Messages" selected={currentIndex === 2} />,
    <NavigationBarItem onTabClick={() => onTabClick(3)} title="Profile" selected={currentIndex === 3} />,
  ];
  return (
    <header className="h-14 px-8 py-3 flex justify-between items-center self-start fixed w-screen bg-kWhiteDark">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-kBlue mr-2 cursor-pointer"></div>
        <p className="text-kBlue font-bold cursor-pointer">DOG WALKING APP</p>
      </div>
      <div className="flex items-center w-1/3 space-x-2">{tabs}</div>
      <div className="flex items-center">
        <MainButton title="POST NEW JOB" />
      </div>
    </header>
  );
};

export default MainNavigationBar;
