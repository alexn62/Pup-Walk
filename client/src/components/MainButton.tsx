interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  invert?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({ title, invert = false, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full font-bold  rounded-md py-2 px-4 ${
        invert
          ? 'text-kBlue bg-white border border-kBlue hover:bg-kBlueLight'
          : 'text-white bg-kBlue hover:bg-kBlueDark'
      } text-sm  hover:shadow-md`}
    >
      {title}
    </button>
  );
};

export default MainButton;
