import { faDog, faEnvelope, faList, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavigationBarItem from './NavigationBarItem';

const MainNavigationBar = () => {
  const tabs = [
    <NavigationBarItem key="1" icon={faDog} path="/home/newJobs" />,
    <NavigationBarItem key="2" icon={faShoePrints} path="/home/myJobs" />,
    <Link
      to="/addJob"
      key="0"
      className="bg-kBlue p-1 rounded-full w-12 h-12 text-white font-bold select-none outline-none  flex justify-center"
    >
      <button>+</button>
    </Link>,
    <NavigationBarItem key="3" icon={faList} path="/home/myListings" />,
    <NavigationBarItem key="4" icon={faEnvelope} path="/home/messages" />,
  ];
  return (
    <header className="fixed bottom-0 py-3 flex justify-center w-screen bg-kWhiteDark">
      <div className="flex items-center justify-around w-full">{tabs}</div>
    </header>
  );
};

export default MainNavigationBar;
