import React from 'react';
import Message from '../components/Message';

const Messages = () => {
  return (
    <div className="flex justify-center pt-16">
      <div className="flex flex-col w-1/3 min-w-[450px] space-y-2">
        <Message read={false}/>
        <Message read={true}/>
      </div>
    </div>
  );
};

export default Messages;
