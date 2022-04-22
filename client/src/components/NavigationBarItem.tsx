import { Link } from 'react-router-dom';

const NavigationBarItem = ({ title, path }: { title: string; path: string }) => {
  const selected = true;
  return (
    <Link
      to={path}
      className={`px-4 py-3  hover:cursor-pointer rounded-2xl ${
        selected ? 'font-semibold text-kBlue bg-kBlueLight' : 'text-black hover:bg-gray-200 duration-100'
      }`}
    >
      {title}
    </Link>
  );
};

export default NavigationBarItem;
