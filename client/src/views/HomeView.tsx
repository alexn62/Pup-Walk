import MainNavigationBar from '../components/MainNavigationBar';
import Messages from './Messages';
import MyJobs from './MyJobs';
import NewJobs from './NewJobs';
import { useState } from 'react';
import LeftSideBar from '../components/LeftSideBar';
const HomeView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const views = [<NewJobs />, <MyJobs />, <Messages />];
  const changeIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };
  return (
    <div>
      <MainNavigationBar onTabClick={changeIndex} currentIndex={currentIndex} />
      <div className="flex flex-row ">
        <LeftSideBar></LeftSideBar>
        {views[currentIndex]}
        <div className="flex-grow mx-7"></div>
      </div>
    </div>
  );
};

export default HomeView;
