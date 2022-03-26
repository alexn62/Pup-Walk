const MainButton = ({ title, invert = false }: { title: string; invert?: boolean }) => {
  return (
    <button
      className={`w-full font-bold  rounded-md py-2 px-4 ${
        invert ? 'text-kBlue bg-white border border-kBlue hover:bg-gray-200' : 'text-white bg-kBlue hover:bg-kBlueDark'
      } text-sm  hover:shadow-md`}
    >
      {title}
    </button>
  );
};

export default MainButton;
