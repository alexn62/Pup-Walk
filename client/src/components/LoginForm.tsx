import MainButton from './MainButton';

const LoginForm = () => {
  return (
    <div className="flex flex-col mb-auto">
      <div className="bg-kWhiteDark bg-opacity-80 shadow-lg rounded-2xl p-[30px] mx-4 h-[430px] max-w-[390px] flex flex-col justify-between">
        <p className="text-xl text-kBlue">Hello Again!</p>
        <p className="text-sm px-3">Please enter your email and password to login</p>
        <div>
          <input
            placeholder="Email"
            className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none"
          ></input>
          <input
            type={'password'}
            placeholder="Password"
            className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none"
          ></input>
          <div className="flex justify-end">
            <p className="text-kBlue text-sm hover:underline hover:cursor-pointer">Forgot Password?</p>
          </div>
        </div>
        <MainButton title="LOGIN"></MainButton>

        <p className="text-kBlue text-sm">or continue with...</p>
        <div>
          <div className="flex">
            <button className="w-full bg-white rounded-md p-2 text-black text-sm mr-1">GOOGLE</button>
            <button className="w-full bg-black rounded-md p-2 text-white text-sm ml-1">APPLE</button>
          </div>
        </div>
      </div>
      <p className="text-kBlue text-sm mt-2 hover:underline hover:cursor-pointer">Sign Up instead</p>
    </div>
  );
};

export default LoginForm;
