import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';

const NavigationBarItem = ({ icon, path }: { icon: IconDefinition; path: string }) => {
  const location = useLocation();
  const selected = location.pathname === path;
  return (
    <NavLink
      to={path}
      className={`px-4 py-3 hover:cursor-pointer rounded-2xl transition-all ${
        selected ? 'font-semibold text-kBlue bg-kBlueLight' : 'text-gray-400 hover:bg-gray-200 duration-100'
      }`}
    >
      <FontAwesomeIcon icon={icon} />
    </NavLink>
  );
};

export default NavigationBarItem;
