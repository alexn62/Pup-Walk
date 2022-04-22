interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  invert?: boolean;
  customBgColor?: string;
  customTextColor?: string;
}

const MainButton: React.FC<ButtonProps> = ({
  title,
  invert = false,
  customBgColor = 'kBlue',
  customTextColor = 'white',
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full font-bold  rounded-md py-2 px-4 ${
        invert
          ? 'text-kBlue bg-white border border-kBlue hover:bg-kBlueLight'
          : `text-${customTextColor} bg-${customBgColor} hover:bg-kBlueDark`
      } text-sm  hover:shadow-md`}
    >
      {title}
    </button>
  );
};

export default MainButton;
