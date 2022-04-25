import SignUpForm from '../components/Auth/SignUpForm';
import bgimg from '../assets/images/corgi_lie.jpg';
const SignUpView = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="flex flex-col absolute justify-around w-screen h-screen items-center">
        <SignUpForm />
      </div>
      <div className="inline-block overflow-hidden">
        <img src={bgimg} alt="bg-lie" className="h-screen w-screen object-cover"></img>
      </div>
    </div>
  );
};

export default SignUpView;
