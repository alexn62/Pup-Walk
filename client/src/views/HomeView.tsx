import MainNavigationBar from '../components/MainNavigationBar';
import Messages from './Messages';
import MyJobs from './MyJobs';
import NewJobs from './NewJobs';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
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
