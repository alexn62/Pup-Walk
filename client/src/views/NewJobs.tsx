import { useQuery } from '@apollo/client';
import * as jobQueries from '../services/queries/JobQueries';

import NewPostItem from '../components/NewPostItem';
import TopBar from '../components/TopBar';
import { geoLoc, Job } from '../interfaces/interfaces';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/auth-context';

const NewJobs = () => {
  const auth = useAuth();

  const { loading, data, error } = useQuery<{ getJobsCloseBy: Job[] }>(jobQueries.getJobsNearby, {
    variables: { maxDistance: 100000, startingPoint: [13.37, 52.51] },
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [newJobs, setNewJobs] = useState<Job[]>([]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setNewJobs(
        data.getJobsCloseBy.filter(
          (job) => job.user.id !== auth?.currentMongoUser?.id && Number(job.startTime) > Date.now()
        )
      );
    }
  }, [data, auth?.currentMongoUser?.id, error]);

  const [currentLocation, setCurrentLocation] = useState<geoLoc>({ x: 13.37, y: 52.51, label: 'Berlin Mitte' });
  const getDistance = (start: number[], end: number[]) => {
    const xDistance = start[0] - end[0];
    const yDistance = start[1] - end[1];
    const sqx = xDistance * xDistance;
    const sqy = yDistance * yDistance;
    const distSum = sqx + sqy;
    const sqrtDist = Math.sqrt(distSum);
    return sqrtDist;
  };
  const handleChange = (e: any): void => {
    const value = e.target.value;

    if (value === 'upcoming') {
      setNewJobs((prev) => [...prev].sort((prevJob, nextJob) => Number(prevJob.startTime) - Number(nextJob.startTime)));
    }
    if (value === 'closest') {
      setNewJobs((prev) =>
        [...prev].sort(
          (prevJob, nextJob) =>
            getDistance([52.51, 13.37], prevJob.jobLocation.coordinates) -
            getDistance([52.51, 13.37], nextJob.jobLocation.coordinates)
        )
      );
    }
  };
  return (
    <>
      {((loading && !data) || loadingLocation) && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="New Jobs"></TopBar>
        <div className="pt-8 pb-2  w-full flex justify-between">
          <div className="flex items-center rounded-md bg-white p-2 space-x-2">
            <div className="rounded-md p-1">{currentLocation.label} </div>
            <FontAwesomeIcon
              onClick={() => {
                setLoadingLocation(true);
                navigator.geolocation.getCurrentPosition(async (position) => {
                  if (position) {
                    setLoadingLocation(false);
                    const response = await fetch(
                      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                    );
                    const data = await response.json();
                    setCurrentLocation({
                      label: data.locality,
                      x: position.coords.longitude,
                      y: position.coords.latitude,
                    });
                  } else {
                    setLoadingLocation(false);
                  }
                });
              }}
              icon={faLocationCrosshairs}
              size="lg"
              color="rgb(73 113 255)"
            />
          </div>

          <select onChange={handleChange} className="ml-1 p-2 rounded-md">
            <option value="upcoming">Upcoming</option>
            <option value="closest">Closest</option>
          </select>
        </div>
        <div className="flex flex-col space-y-3 w-full pb-16">
          {newJobs &&
            newJobs.map((job: Job) => <NewPostItem job={job} setJobs={setNewJobs} key={job.id}></NewPostItem>)}
        </div>
      </div>
    </>
  );
};

export default NewJobs;
