import Message from '../components/Message';

const Messages = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col max-w-[720px] min-w-[450px] space-y-2">
        <Message read={false} />
        <Message read={true} />
      </div>
    </div>
  );
};

export default Messages;
