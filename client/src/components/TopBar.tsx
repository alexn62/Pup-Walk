import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';

const TopBar = ({ title }: { title: string }) => {
  const location = useLocation();

  return (
    <div className="bg-kWhiteDark fixed py-3 top-0 flex justify-center w-full">
      <h1 className="text-center font-bold text-kBlue">
        {title}
        {location.pathname === '/home/newJobs' && (
          <div className="absolute left-5 top-3">
            <NavLink to={'/account'}>
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </NavLink>
          </div>
        )}
      </h1>
    </div>
  );
};

export default TopBar;
