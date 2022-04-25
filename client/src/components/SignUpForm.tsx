import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../store/auth-context';
import MainButton from './MainButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    password: Yup.string().required('Password is mendatory').min(8, 'Password must be at least eight characters long'),
    confirmPassword: Yup.string()
      .required('Password is mandatory')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>(formOptions);

  const authContext = useAuth();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    await authContext?.signUp(data.email, data.password);
    navigate('/setupUser');
  };
  return (
    <div className="flex flex-col items-center">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 h-[430px] max-w-[390px] flex flex-col justify-between ">
        <p className="text-xl text-kBlue mx-auto">Welcome!</p>
        <p className="text-sm px-3 text-left">Please enter your email and password to sign up</p>
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
              {...register('password')}
              placeholder="Password"
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.password ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.password && <span className="text-xs text-red-400 ml-1 mr-auto">{errors.password.message}</span>}
            <input
              type={'password'}
              {...register('confirmPassword')}
              placeholder={'Confirm Password'}
              className={`w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none ${
                errors.confirmPassword ? 'border-red-400' : 'border'
              }`}
            ></input>
            {errors.confirmPassword && (
              <span className="text-xs text-red-400 ml-1 mr-auto">{errors.confirmPassword.message}</span>
            )}
            <div className="h-3"></div>
            <MainButton type="submit" title="SING UP"></MainButton>
          </div>
        </form>
        <p className="text-kBlue text-sm mx-auto">or continue with...</p>
        <div>
          <div className="flex">
            <button className="w-full bg-white rounded-md p-2 text-black text-sm mr-1">GOOGLE</button>
            <button className="w-full bg-black rounded-md p-2 text-white text-sm ml-1">APPLE</button>
          </div>
        </div>
      </div>
      <Link to="/login" className="text-kBlue text-sm mt-2 hover:underline hover:cursor-pointer">
        Login instead
      </Link>
    </div>
  );
};

export default SignUpForm;
