import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../store/auth-context';
import MainButton from './MainButton';

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const authContext = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    await authContext?.signUp(data.email, data.password);
  };
  return (
    <div className="flex flex-col mb-auto">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 h-[430px] max-w-[390px] flex flex-col justify-between ">
        <p className="text-xl text-kBlue">Welcome!</p>
        <p className="text-sm px-3">Please enter your email and password to sign up</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-1">
            <input
              placeholder="Email"
              {...register('email', { required: true })}
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.email ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.email && <span className="text-xs text-red-400 ml-1 mr-auto">This field is required</span>}
            <input
              type={'password'}
              placeholder="Password"
              {...register('password', { required: true })}
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.password ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.password && <span className="text-xs text-red-400 ml-1 mr-auto">This field is required</span>}
            <input
              type={'password'}
              {...register('confirmPassword', { required: true })}
              placeholder="Confirm Password"
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.confirmPassword ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.confirmPassword && (
              <span className="text-xs text-red-400 ml-1 mr-auto">This field is required</span>
            )}
            <div className="h-3"></div>
            <MainButton type="submit" title="SING UP"></MainButton>
          </div>
        </form>
        <p className="text-kBlue text-sm">or continue with...</p>
        <div>
          <div className="flex">
            <button className="w-full bg-white rounded-md p-2 text-black text-sm mr-1">GOOGLE</button>
            <button className="w-full bg-black rounded-md p-2 text-white text-sm ml-1">APPLE</button>
          </div>
        </div>
      </div>
      <p className="text-kBlue text-sm mt-2 hover:underline hover:cursor-pointer">Login instead</p>
    </div>
  );
};

export default SignUpForm;
