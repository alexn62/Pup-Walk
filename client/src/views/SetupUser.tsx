import { SubmitHandler, useForm } from 'react-hook-form';
import MainButton from '../components/MainButton';
import { useAuth } from '../store/auth-context';
import spinner from '../assets/icons/spinner.svg';
import { useMutation } from '@apollo/client';
import * as userQueries from '../services/queries/UserQueries';
import { useNavigate } from 'react-router-dom';
type SetupUserInputs = {
  firstName: string;
  middleName?: string;
  lastName: string;
  sex: string;
};
const SetupUser = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [addUser, { loading, data, error }] = useMutation(userQueries.addUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupUserInputs>();

  const onSubmit: SubmitHandler<SetupUserInputs> = async (data) => {
    const variables = { ...data, email: auth?.userSigningUp?.email };
    try {
      const response = await addUser({
        variables: variables,
      });
      auth?.setCurrentMongoUser(response.data?.addUser);
      navigate('/home/newJobs');
    } catch {
      return;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 max-w-[390px] flex flex-col space-y-3 justify-between">
        <p className="text-xl text-kBlue mx-auto">Welcome to the family!</p>
        <p className="text-sm px-3 text-center">Please fill in your details to continue</p>
        <div>
          <p>{auth?.userSigningUp?.email}</p>
          <p>{error?.toString()}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              disabled={loading && !data}
              placeholder="First Name*"
              {...register('firstName', { required: true })}
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none ${
                errors.firstName ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.firstName && <span className="text-xs text-red-400 mt-1 mr-auto">This field is required</span>}
            <input
              {...register('middleName', { required: false })}
              disabled={loading && !data}
              placeholder="Middle Name"
              className="w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none"
            ></input>
            <input
              {...register('lastName', { required: true })}
              disabled={loading && !data}
              placeholder="Last Name*"
              className={`w-full rounded-md border focus:border-kBlue p-2 mt-2 text-sm focus:outline-none ${
                errors.lastName ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.lastName && <span className="text-xs text-red-400 mt-1  mr-auto">This field is required</span>}
            <div className="pt-4 w-full flex justify-center">
              {loading && !data ? (
                <img src={spinner} alt="spinner"></img>
              ) : (
                <MainButton type="submit" title="Submit"></MainButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupUser;
