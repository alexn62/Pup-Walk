import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import MainButton from '../Shared/MainButton';

const BackOrAddAnotherJob = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-red-500 flex flex-col justify-center items-center">
      <div className="absolute bottom-4 left-3 right-3 flex flex-col space-y-36">
        <FontAwesomeIcon icon={faCircleCheck} color="green" size={'10x'} />
        <div className="flex justify-between space-x-2">
          <MainButton
            title="Back"
            invert={true}
            onClick={() => {
              navigate('/home/newJobs');
            }}
          />
          <MainButton
            title="Add another job"
            onClick={() => {
              navigate('/addJob');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BackOrAddAnotherJob;
