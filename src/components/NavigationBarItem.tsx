const NavigationBarItem = ({ title, selected }: { title: string; selected: boolean }) => {
  return (
    <div
      className={`px-4 py-3  hover:cursor-pointer rounded-2xl ${
        selected ? 'font-semibold text-kBlue bg-kBlueLight' : 'text-black'
      }`}
    >
      {title}
    </div>
  );
};

export default NavigationBarItem;
