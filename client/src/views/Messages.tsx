import Message from '../components/Messages/Message';
import TopBar from '../components/Shared/TopBar';

const Messages = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <TopBar title="Messages"></TopBar>
      <div className="pt-8 flex flex-col space-y-2">
        <Message read={false} />
        <Message read={true} />
      </div>
    </div>
  );
};

export default Messages;
