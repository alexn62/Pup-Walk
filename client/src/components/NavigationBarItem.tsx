const NavigationBarItem = ({
  title,
  selected,
  onTabClick,
}: {
  title: string;
  selected: boolean;
  onTabClick: React.MouseEventHandler;
}) => {
  return (
    <div
      onClick={onTabClick}
      className={`px-4 py-3  hover:cursor-pointer rounded-2xl ${
        selected ? 'font-semibold text-kBlue bg-kBlueLight' : 'text-black hover:bg-gray-200 duration-100'
      }`}
    >
      {title}
    </div>
  );
};

export default NavigationBarItem;
