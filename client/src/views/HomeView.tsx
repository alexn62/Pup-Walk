import MainNavigationBar from '../components/MainNavigationBar';
import Messages from './Messages';
import MyJobs from './MyJobs';
import NewJobs from './NewJobs';
import { useState } from 'react';
const HomeView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const views = [<NewJobs />, <MyJobs />, <Messages />];
  const changeIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };
  return (
    <div>
      <MainNavigationBar onTabClick={changeIndex} currentIndex={currentIndex} />
      {views[currentIndex]}
    </div>
  );
};

export default HomeView;
