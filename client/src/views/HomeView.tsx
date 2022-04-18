import MainNavigationBar from '../components/MainNavigationBar';
import Messages from './Messages';
import MyJobs from './MyJobs';
import NewJobs from './NewJobs';
import { useState } from 'react';
// import LeftSideBar from '../components/LeftSideBar';
const HomeView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const views = [<NewJobs />, <MyJobs />, <Messages />];
  const changeIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen">
      <div className="p-4">{views[currentIndex]}</div>
      <MainNavigationBar onTabClick={changeIndex} currentIndex={currentIndex} />
    </div>
  );
};

export default HomeView;
