import MainButton from "./MainButton";

const SignUpForm = () => {
  return (
    <div className="flex flex-col mb-auto">
      <div className="bg-kWhiteDark bg-opacity-80 rounded-2xl p-[30px] mx-4 h-[430px] max-w-[390px] flex flex-col justify-between">
        <p className="text-xl text-kBlue">Welcome!</p>
        <p className="text-sm px-3">Please enter your email and password to sign up</p>
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
          <input
            type={'password'}
            placeholder="Password"
            className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm focus:outline-none"
          ></input>
          
        </div>
        <MainButton title="SING UP"></MainButton>
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
