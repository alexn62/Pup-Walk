import NavigationBar from '../components/AuthNavigationBar';
import SignUpForm from '../components/SignUpForm';

const SignUpView = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="flex flex-col absolute justify-center w-screen h-screen items-center ">
        <NavigationBar />
        <SignUpForm />
      </div>
      <div className="inline-block overflow-hidden">
        <img
          src={require('../assets/images/corgi_lie.jpg')}
          alt="bg-lie"
          className="h-screen w-screen object-cover"
        ></img>
      </div>
    </div>
  );
};

export default SignUpView;
