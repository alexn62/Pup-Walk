import React from 'react';
import { Job } from '../interfaces/interfaces';
import MyJobsItem from './MyJobsItem';

const MyJobsSection = ({ title, jobs }: { title: string; jobs: Job[] }) => {
  return (
    <div>
      <h3 className="font-bold text-left my-4">{title}</h3>
      <div className="flex flex-col space-y-3 w-full">
        {jobs.map((job: Job) => (
          <MyJobsItem key={job.id} job={job}></MyJobsItem>
        ))}
      </div>
    </div>
  );
};

export default MyJobsSection;
