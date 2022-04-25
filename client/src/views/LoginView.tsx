import LoginForm from '../components/LoginForm';
import bgimg from '../assets/images/corgi_sit.jpg';
const LoginView = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="flex flex-col absolute justify-center w-screen h-screen items-center ">
        <LoginForm />
      </div>
      <div className="inline-block overflow-hidden">
        <img src={bgimg} alt="bg-sit" className="h-screen w-screen object-cover"></img>
      </div>
    </div>
  );
};

export default LoginView;
