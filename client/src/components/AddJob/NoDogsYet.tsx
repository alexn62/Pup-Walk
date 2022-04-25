import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../Shared/MainButton';

const NoDogsYet = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  flex flex-col justify-center items-center ">
      <div className="fixed bottom-4 left-4 right-4 flex flex-col border space-y-4 rounded-lg border-kBlue bg-white p-3 text-center">
        <div>Before you can post job listings, you need to add your dog(s)!</div>
        <div className="flex flex-row space-x-2 w-full right-0 ">
          <MainButton
            title="Back"
            invert={true}
            onClick={() => {
              navigate(-1);
            }}
          />
          <MainButton
            title="Add Dog"
            onClick={() => {
              navigate('/addDog');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoDogsYet;
