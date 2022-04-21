import { useMutation } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MainButton from '../components/MainButton';
import TopBar from '../components/TopBar';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as api from '../services/api.service';
import debounce from 'lodash.debounce';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import spinner from '../assets/icons/spinner.svg';
import ToggleButton from '../components/ToggleButton';

// Interfaces
interface geoLoc {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds?: [
    [number, number], // south, west - lat, lon
    [number, number] // north, east - lat, lon
  ];
  raw?: any; // raw
}

type AddJobFormInputs = {
  title: string;
  details: string;
  duration: number;
  hourlyPay: number;
  startTime: Date;
  locationString: string;
};

interface AddJobVariables {
  user: string;
  dog: string;
  title: string;
  details: string;
  latitude: number;
  longitude: number;
  duration: number;
  hourlyPay: number;
  startTime: string;
  status: string;
}

interface Option {
  label: string;
  active: boolean;
}

const AddJob = () => {
  // duration
  const [durationOptions, setDurationOptions] = useState<Option[]>([
    { label: '30', active: false },
    { label: '60', active: false },
    { label: '90', active: false },
  ]);
  const [duration, setDuration] = useState('');

  // hourly pay
  const [hourlyPayOptions, setHourlyPayOptions] = useState<Option[]>([
    { label: '10', active: false },
    { label: '15', active: false },
    { label: '20', active: false },
  ]);
  const [hourlyPay, setHourlyPay] = useState('');

  // location
  const [locationFocus, setLocationFocus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    x: 0,
    y: 0,
    label: '',
  });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const provider = useMemo(() => {
    return new OpenStreetMapProvider();
  }, []);

  const [searchResults, setSearchResults] = useState<geoLoc[]>([]);

  const getSearchResults = useMemo(() => {
    return debounce(async (query: string) => {
      const results = (await provider.search({ query: query })) as geoLoc[];
      setSearchResults((_) => results.slice(0, 10));
    }, 200);
  }, [provider]);

  const handleSearchQueryChange = (e: any) => {
    setCurrentLocation((prev) => ({ ...prev, label: e.target.value }));
    getSearchResults(e.target.value);
  };

  const handleSearchResultClick = (searchResult: geoLoc) => {
    setCurrentLocation((_) => searchResult);
  };

  // form setup
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddJobFormInputs>();

  const onSubmit: SubmitHandler<AddJobFormInputs> = async (data) => {
    let valid = true;
    clearErrors();
    if (+duration < 15) {
      setError('duration', { type: 'tooshort' });
      valid = false;
    }
    if (+hourlyPay < 10) {
      setError('hourlyPay', { type: 'toolittle' });
      valid = false;
    }
    if (new Date() > new Date(getValues('startTime'))) {
      setError('startTime', { type: 'inthepast' });
      valid = false;
    }
    if (!currentLocation.x || !currentLocation.y) {
      setError('locationString', { type: 'invalidlocation' });
      valid = false;
    }
    if (!valid) return;
    const variables = getVariables(data);

    const response = await addNewJob({ variables: variables });
    console.log(response);
  };

  // mutation
  const [addNewJob] = useMutation(api.addJob);

  const getVariables = (input: AddJobFormInputs): AddJobVariables => {
    return {
      user: '624efadb989d6d26dfd1e55d',
      dog: '624efc55989d6d26dfd1e55f',
      title: input.title,
      details: input.details,
      latitude: currentLocation.y,
      longitude: currentLocation.x,
      duration: +duration,
      hourlyPay: +hourlyPay,
      startTime: input.startTime.toString(),
      status: 'OPEN',
    };
  };

  return (
    <>
      <TopBar title="Add Job"></TopBar>
      <div className="p-3 pt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title:
            <input
              placeholder="Quick walk around the block..."
              {...register('title', { required: true })}
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.title ? 'border-red-400' : 'border'
              }`}
            ></input>
          </label>
          {errors.title?.type === 'required' && (
            <p className="text-sm text-red-500 text-right">This field is required</p>
          )}
          <label>
            Details:
            <textarea
              placeholder="The pup needs to get outside..."
              {...register('details', { required: true, maxLength: 150 })}
              className={`h-24 w-full rounded-md border focus:border-kBlue p-2 mt-1 text-sm focus:outline-none ${
                errors.details ? 'border-red-400' : 'border'
              }`}
            ></textarea>
          </label>
          {errors.details?.type === 'required' && (
            <p className="text-sm text-red-500 text-right">This field is required</p>
          )}
          {errors.details?.type === 'maxLength' && <p className="text-sm text-red-500 text-right">Too long</p>}
          <label>
            Duration:
            <div className="flex flex-row items-center space-x-2">
              <input
                disabled={durationOptions.some((el) => el.active)}
                type="number"
                placeholder="45"
                value={duration}
                {...register('duration', {
                  onChange: (e: any) => {
                    setDuration(e.target.value);
                  },
                })}
                className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                  errors.duration ? 'border-red-400' : 'border'
                }`}
              ></input>
              {durationOptions.map((option) => (
                <ToggleButton
                  key={option.label}
                  label={option.label}
                  active={option.active}
                  onClick={(e: any) => {
                    e.preventDefault();
                    clearErrors('duration');
                    setDuration(option.label);
                    setDurationOptions((prev) =>
                      [...prev].map((el) => ({ ...el, active: option.label === el.label ? !el.active : false }))
                    );
                  }}
                ></ToggleButton>
              ))}
              <p>min</p>
            </div>
          </label>
          {errors.duration && <p className="text-sm text-red-500 text-right">The minimum duration is 15 minutes</p>}

          <label>
            Hourly Pay:
            <div className="flex flex-row items-center space-x-2">
              <input
                disabled={hourlyPayOptions.some((el) => el.active)}
                type="number"
                placeholder="18.00"
                value={hourlyPay}
                {...register('hourlyPay', {
                  onChange: (e: any) => {
                    setHourlyPay(e.target.value);
                  },
                })}
                className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                  errors.hourlyPay ? 'border-red-400' : 'border'
                }`}
              ></input>
              {hourlyPayOptions.map((option) => (
                <ToggleButton
                  key={option.label}
                  label={option.label}
                  active={option.active}
                  onClick={(e: any) => {
                    e.preventDefault();
                    clearErrors('hourlyPay');
                    setHourlyPay(option.label);
                    setHourlyPayOptions((prev) =>
                      [...prev].map((el) => ({ ...el, active: option.label === el.label ? !el.active : false }))
                    );
                  }}
                ></ToggleButton>
              ))}
              <p>USD</p>
            </div>
          </label>
          {errors.hourlyPay && <p className="text-sm text-red-500 text-right">The minimum pay is $10.00</p>}
          <label>Date and time:</label>
          <input
            type="datetime-local"
            {...register('startTime', { required: true })}
            className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.startTime ? 'border-red-400' : 'border'
            }`}
          ></input>
          {errors.startTime && <p className="text-sm text-red-500 text-right">Invalid Date</p>}

          <label>Location:</label>
          <div className="flex flex-row relative items-center">
            <div className="flex-grow mr-2">
              <input
                disabled={loadingLocation}
                autoComplete="off"
                onFocus={() => setLocationFocus(true)}
                placeholder="Berlin..."
                value={loadingLocation ? 'Loading...' : currentLocation.label}
                {...register('locationString', {
                  onChange: (e) => handleSearchQueryChange(e),
                  onBlur: () => setLocationFocus(false),
                })}
                className={` w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none mr-4 ${
                  errors.locationString ? 'border-red-400' : 'border'
                }`}
              ></input>
              {errors.locationString && <p className="text-sm text-red-500 text-right">Invalid location</p>}

              {locationFocus && searchResults.length > 0 && (
                <div className="absolute top-12 w-full bg-white border border-kBlue p-2 flex flex-col max-h-48 overflow-scroll">
                  {searchResults.map((el) => (
                    <p
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setLocationFocus(true);
                      }}
                      onClick={() => {
                        handleSearchResultClick(el);
                        setLocationFocus(false);
                      }}
                      className="py-2 text-sm"
                      key={el.x}
                    >
                      {el.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {loadingLocation ? (
              <img src={spinner} alt="spinner"></img>
            ) : (
              <FontAwesomeIcon
                onClick={() => {
                  setLoadingLocation(true);
                  clearErrors('locationString');
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
                className=" p-2 "
              />
            )}
          </div>
          <div className="flex flex-row space-x-2 fixed bottom-0 w-full right-0 p-3">
            <MainButton title="Cancel" invert={true}></MainButton>
            <MainButton title="Add" type="submit"></MainButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJob;
