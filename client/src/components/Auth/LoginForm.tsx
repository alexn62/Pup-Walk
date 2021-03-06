import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';
import MainButton from '../Shared/MainButton';
type LoginInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
const LoginForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginInputs>();
  const [error, setError] = useState('');
  const authContext = useAuth();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setError('');
      await authContext?.signIn(data.email, data.password, () => navigate('/home/newJobs'));
    } catch (e) {
      setError('Unable to login!');
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 h-[430px] max-w-[390px] flex flex-col justify-between">
        <p className="text-xl text-kBlue mx-auto">Hello Again!</p>
        {error !== '' && (
          <p className="w-full text-center bg-red-200 text-red-600 p-2 my-2 border border-red-600 rounded-lg">
            {error}
          </p>
        )}
        <p className="text-sm px-3 text-center">Please enter your email and password to login</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              autoComplete="off"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none"
            ></input>
            <input
              type={'password'}
              {...register('password', { required: true })}
              placeholder="Password"
              className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none"
            ></input>
            <p className="text-kBlue text-sm hover:underline hover:cursor-pointer mb-1 text-right">Forgot Password?</p>
            <MainButton type="submit" title="LOGIN"></MainButton>
          </form>
        </div>

        <p className="text-kBlue text-sm mx-auto">or continue with...</p>
        <div className="flex">
          <button className="w-full bg-white rounded-md p-2 text-black text-sm mr-1">GOOGLE</button>
          <button className="w-full bg-black rounded-md p-2 text-white text-sm ml-1">APPLE</button>
        </div>
      </div>
      <Link to="/signup" className="text-kBlue text-sm mt-2 hover:underline hover:cursor-pointer">
        Sign Up instead
      </Link>
    </div>
  );
};

export default LoginForm;
