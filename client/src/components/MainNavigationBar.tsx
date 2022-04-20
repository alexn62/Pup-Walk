import React from 'react';
import { Link } from 'react-router-dom';
// import MainButton from './MainButton';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = ({
  onTabClick,
  currentIndex,
}: {
  onTabClick: (index: number) => void;
  currentIndex: number;
}) => {
  const tabs = [
    <NavigationBarItem key="1" onTabClick={() => onTabClick(0)} title="E" selected={currentIndex === 0} />,
    <NavigationBarItem key="2" onTabClick={() => onTabClick(1)} title="J" selected={currentIndex === 1} />,
    <Link
      to="/addJob"
      key="0"
      className="bg-kBlue p-1 rounded-full w-12 h-12 text-white font-bold select-none outline-none  flex justify-center"
    >
      <button>+</button>
    </Link>,
    <NavigationBarItem key="3" onTabClick={() => onTabClick(2)} title="L" selected={currentIndex === 2} />,
    <NavigationBarItem key="4" onTabClick={() => onTabClick(3)} title="M" selected={currentIndex === 3} />,
    // <NavigationBarItem key="5" onTabClick={() => onTabClick(4)} title="P" selected={currentIndex === 4} />,
  ];
  return (
    <header className="fixed bottom-0 py-3 flex justify-center w-screen bg-kWhiteDark">
      <div className="flex items-center justify-around w-full">{tabs}</div>
    </header>
  );
};

export default MainNavigationBar;
