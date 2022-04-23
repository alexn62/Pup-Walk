import spinner from '../assets/icons/spinner.svg';

const FullScreenLoadingIndicator = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center bg-black bg-opacity-20 absolute z-10 top-0 left-0">
      <img className="h-6" src={spinner} alt="spinner"></img>
    </div>
  );
};

export default FullScreenLoadingIndicator;
