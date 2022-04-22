import React from 'react';
import { Link } from 'react-router-dom';
// import MainButton from './MainButton';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = () => {
  const tabs = [
    <NavigationBarItem key="1" title="E" path="/home/newJobs" />,
    <NavigationBarItem key="2" title="J" path="/home/myJobs" />,
    <Link
      to="/addJob"
      key="0"
      className="bg-kBlue p-1 rounded-full w-12 h-12 text-white font-bold select-none outline-none  flex justify-center"
    >
      <button>+</button>
    </Link>,
    <NavigationBarItem key="3" title="L" path="/home/myListings" />,
    <NavigationBarItem key="4" title="M" path="/home/messages" />,
  ];
  return (
    <header className="fixed bottom-0 py-3 flex justify-center w-screen bg-kWhiteDark">
      <div className="flex items-center justify-around w-full">{tabs}</div>
    </header>
  );
};

export default MainNavigationBar;
