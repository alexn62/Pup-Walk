import React from 'react';

interface SideBarItemProps {
  onClick: () => void;
  title: string;
}

const SideBarItem = ({ onClick, title }: SideBarItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-60 flex flex-row space-x-2 align-middle transition-all hover:bg-kBlueLight p-3 rounded-2xl max-w-60"
    >
      <div className="w-6 h-6 rounded-full bg-white"></div>
      <div className="font-semibold text-kBlue">{title}</div>
    </button>
  );
};

export default SideBarItem;
