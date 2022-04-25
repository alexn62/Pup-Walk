import MainNavigationBar from '../components/Navigation/MainNavigationBar';

import { Outlet } from 'react-router-dom';
const HomeView = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen ">
      <div className="p-4  w-full">
        <Outlet></Outlet>
      </div>
      <MainNavigationBar />
    </div>
  );
};

export default HomeView;
