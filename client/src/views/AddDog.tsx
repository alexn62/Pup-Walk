import { useMutation } from '@apollo/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as dogQueries from '../services/queries/DogQueries';
import { useAuth } from '../store/auth-context';
import MainButton from '../components/MainButton';
import { useNavigate } from 'react-router-dom';

type AddDogInputs = {
  name: string;
  description: string;
  breed: string;
  age: number;
  sex: string;
};
const AddDog = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [addDog, { loading, data, error }] = useMutation(dogQueries.addDog);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDogInputs>();
  const onSubmit: SubmitHandler<AddDogInputs> = async (data) => {
    const variables = { ...data, owner: auth?.currentMongoUser?.id, age: +data.age };
    try {
      const response = await addDog({
        variables: variables,
      });
      auth?.setCurrentMongoUser((prev) => {
        if (prev) {
          return { ...prev, dogs: prev.dogs ? [...prev.dogs, response.data.addDog] : [response.data.addDog] };
        }
      });
      navigate('/addJob');
    } catch {
      return;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 max-w-[390px] flex flex-col space-y-3 justify-between">
        <p className="text-xl text-kBlue mx-auto">Add your furry friend!</p>
        <p className="text-sm px-3 text-center">Please fill in your details to continue</p>
        <div>
          <p>{error?.toString()}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              disabled={loading && !data}
              placeholder="Name"
              {...register('name', { required: true })}
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none ${
                errors.name ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.name && <span className="text-xs text-red-400 mt-1 mr-auto">This field is required</span>}

            <input
              {...register('breed', { required: true })}
              disabled={loading && !data}
              placeholder="Breed"
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none ${
                errors.breed ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.breed && <span className="text-xs text-red-400 mt-1  mr-auto">This field is required</span>}
            <textarea
              {...register('description', { required: true })}
              disabled={loading && !data}
              placeholder="Description"
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none ${
                errors.description ? 'border-red-400' : 'border'
              }`}
            ></textarea>
            {errors.breed && <span className="text-xs text-red-400 mt-1  mr-auto">This field is required</span>}

            <input
              type={'number'}
              {...register('age', { required: true })}
              disabled={loading && !data}
              placeholder="Age"
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-0.5 text-sm focus:outline-none ${
                errors.age ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.age && <span className="text-xs text-red-400 mt-1  mr-auto">This field is required</span>}
            <select {...register('sex')} className="p-2 mt-2 rounded-md w-full border border-gray-200">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <div className="pt-4 w-full flex justify-center">
              <MainButton loading={loading && !data} type="submit" title="Submit"></MainButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDog;
