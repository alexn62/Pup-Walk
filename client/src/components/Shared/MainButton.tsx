import spinner from '../../assets/icons/spinner.svg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  invert?: boolean;
  customBgColor?: string;
  customTextColor?: string;
  loading?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
  loading = false,
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
      {loading ? <img className="h-4 mx-auto" src={spinner} alt="spinner"></img> : <p>{title}</p>}
    </button>
  );
};

export default MainButton;
