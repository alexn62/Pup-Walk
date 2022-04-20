import { useMutation } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import MainButton from '../components/MainButton';
import TopBar from '../components/TopBar';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as api from '../services/api.service';
import debounce from 'lodash.debounce';
import { isConstructorDeclaration } from 'typescript';
interface geoLoc {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds?: [
    [number, number], // south, west - lat, lon
    [number, number] // north, east - lat, lon
  ];
  raw: any; // raw
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

const AddJob = () => {
  const [locationFocus, setLocationFocus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    x: 0,
    y: 0,
    label: '',
    raw: '',
  });
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddJobFormInputs>();

  const [addNewJob, { /*error,*/ loading }] = useMutation(api.addJob);

  const getVariables = (input: AddJobFormInputs): AddJobVariables => {
    console.log(input);
    return {
      user: '624efadb989d6d26dfd1e55d',
      dog: '624efc55989d6d26dfd1e55f',
      title: input.title,
      details: input.details,
      latitude: currentLocation.y,
      longitude: currentLocation.x,
      duration: +input.duration,
      hourlyPay: +input.hourlyPay,
      startTime: input.startTime.toString(),
      status: 'OPEN',
    };
  };

  const onSubmit: SubmitHandler<AddJobFormInputs> = async (data) => {
    const variables = getVariables(data);
    console.log(variables);
    const mockVariables = {
      user: '624efadb989d6d26dfd1e55d',
      dog: '624efc55989d6d26dfd1e55f',
      title: 'EXAMPLE2',
      details: 'Frankie needs her walk today or she will be super mad later today...',
      latitude: 53,
      longitude: 13,
      duration: 75,
      hourlyPay: 16,
      startTime: '2022-04-08T15:23:22.176+00:00',
      status: 'OPEN',
    };
    const response = await addNewJob({ variables: variables });
    console.log(response);
  };

  return (
    <>
      <TopBar title="Add Job"></TopBar>
      <div className="p-3 pt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Title..."
            {...register('title', { required: true })}
            className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.title ? 'border-red-400' : 'border'
            }`}
          ></input>
          <textarea
            placeholder="Details..."
            {...register('details', { required: true })}
            className={`h-24 w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.details ? 'border-red-400' : 'border'
            }`}
          ></textarea>
          <input
            type="number"
            placeholder="Duration..."
            {...register('duration', { required: true })}
            className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.duration ? 'border-red-400' : 'border'
            }`}
          ></input>
          <input
            type="number"
            placeholder="Hourly pay..."
            {...register('hourlyPay', { required: true })}
            className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.hourlyPay ? 'border-red-400' : 'border'
            }`}
          ></input>
          <input
            type="datetime-local"
            {...register('startTime', { required: true })}
            className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
              errors.startTime ? 'border-red-400' : 'border'
            }`}
          ></input>
          <div className="flex flex-row relative">
            <div>
              <input
                onFocus={() => setLocationFocus(true)}
                placeholder="Location..."
                value={currentLocation.label}
                {...register('locationString', {
                  required: true,
                  onChange: (e) => handleSearchQueryChange(e),
                  onBlur: () => setLocationFocus(false),
                })}
                className={` w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none mr-4 ${
                  errors.locationString ? 'border-red-400' : 'border'
                }`}
              ></input>
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
            <button className="bg-kBlue p-2 rounded-full text-white">📍</button>
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
