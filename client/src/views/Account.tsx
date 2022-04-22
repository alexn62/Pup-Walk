import { useNavigate } from 'react-router-dom';
import MainButton from '../components/MainButton';
import TopBar from '../components/TopBar';
import { useAuth } from '../store/auth-context';

const Account = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full">
      <TopBar title="Account"></TopBar>
      <div className="pt-12 flex flex-col space-y-2">
        <div className="flex flex-row space-x-2 fixed bottom-0 w-full right-0 p-3">
          <MainButton
            title="Logout"
            onClick={async (e) => {
              e.preventDefault();
              await auth?.logout();
              navigate('/login');
            }}
            // customBgColor={'red-500'}
          ></MainButton>
        </div>
      </div>
    </div>
  );
};

export default Account;
