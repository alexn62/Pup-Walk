import { useQuery } from '@apollo/client';
import * as jobQueries from '../services/queries/JobQueries';
import NewPostItem from '../components/NewPostItem';
import TopBar from '../components/TopBar';
import { geoLoc, Job } from '../interfaces/interfaces';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../store/auth-context';
import { getDistance } from '../utils/getDistance';

const NewJobs = () => {
  // SERVICES
  const auth = useAuth();

  // STATE VARIABLES
  const [maxDistance, setMaxDistance] = useState(10000);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [newJobs, setNewJobs] = useState<Job[]>([]);
  const [currentLocation, setCurrentLocation] = useState<geoLoc>({ x: 13.37, y: 52.51, label: 'Berlin Mitte' });
  const { loading, data } = useQuery<{ getJobsCloseBy: Job[] }>(jobQueries.getJobsNearby, {
    variables: { maxDistance: maxDistance, startingPoint: [13.37, 52.51] },
  });

  // EVENT HANDLERS
  const handleMaxDistanceChange = (e: any) => {
    const value = e.target.value;
    setMaxDistance(+value);
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

  // USEEFFECT

  const findRevelevantJobs = useCallback(
    (job: Job): Job | undefined => {
      const isOpen = job.status === 'open';
      const isPending = job.status === 'pending';
      const currentUserGotTheJob = job.acceptedUser?.id === auth?.currentMongoUser?.id;
      const isPendingAndCurrentUserGotTheJob = isPending && currentUserGotTheJob;
      const isNotLoggedInUsersPost = job.user.id !== auth?.currentMongoUser?.id;
      const isInTheFuture = Number(job.startTime) > Date.now();
      if ((isOpen || isPendingAndCurrentUserGotTheJob) && isNotLoggedInUsersPost && isInTheFuture) {
        return job;
      }
    },
    [auth?.currentMongoUser?.id]
  );

  useEffect(() => {
    if (data) {
      setNewJobs(data.getJobsCloseBy.filter(findRevelevantJobs));
    }
  }, [data, findRevelevantJobs]);

  // HELPERS

  const getCurrentLocation = () => {
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
  };

  return (
    <>
      {((loading && !data) || loadingLocation) && <FullScreenLoadingIndicator></FullScreenLoadingIndicator>}
      <div className="flex flex-col items-center w-full">
        <TopBar title="New Jobs"></TopBar>
        <div className="pt-8 pb-2 w-full flex justify-between">
          <div className="flex items-center rounded-md bg-white p-2 space-x-2">
            <div className="rounded-md p-1">{currentLocation.label} </div>
            <FontAwesomeIcon
              onClick={getCurrentLocation}
              icon={faLocationCrosshairs}
              size="lg"
              color="rgb(73 113 255)"
            />
          </div>

          <select onChange={handleMaxDistanceChange} className="ml-1 p-2 rounded-md">
            <option value={1000}>1 km</option>
            <option value={3000}>3 km</option>
            <option value={5000}>5 km</option>
            <option value={10000}>10 km</option>
          </select>
          <select onChange={handleChange} className="ml-1 p-2 rounded-md">
            <option value="upcoming">Upcoming</option>
            <option value="closest">Closest</option>
          </select>
        </div>
        {!newJobs.length && !loading ? (
          <div className="my-48 flex flex-col items-center justify-center">
            <p className="text-center font-semibold">There are no new jobs in your area right now!</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 w-full pb-16">
            {newJobs.map((job: Job) => (
              <NewPostItem job={job} setJobs={setNewJobs} key={job.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewJobs;
