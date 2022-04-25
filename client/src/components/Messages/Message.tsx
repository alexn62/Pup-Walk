import React from 'react';

const Message = ({ read }: { read: boolean }) => {
  return (
    <div
      className={`h-20 w-full rounded-2xl flex flex-row items-center py-2 px-3 space-x-2 duration-100 transition ${
        read ? 'hover:bg-white hover:bg-opacity-70' : 'bg-white'
      }`}
    >
      <div className="w-14 min-w-[56px] h-14 rounded-full bg-kBlueLight"></div>
      <div className="flex flex-col justify-center space-y-1">
        <div className="flex flex-row justify-between">
          <p className="text-kBlue font-semibold">John Doe</p>
        </div>
        <div className="flex">
          <p className="line-clamp-1 text-sm text-left">
            Ea aliqua tempor nisi id qui. Dolor veniam et anim do mollit. Elit aliquip ipsum cillum officia laboris sunt
            sint ea proident.
          </p>
          <p className="text-kLightGrey text-sm">13:34</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
