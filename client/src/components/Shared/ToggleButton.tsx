const ToggleButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: (e: any) => void }) => {
  return (
    <button
      onClick={onClick}
      className={`border rounded-md border-kBlue  whitespace-nowrap px-4 h-9 transition-all ${
        active ? 'bg-kBlue text-white' : 'bg-white text-kBlue'
      }`}
    >
      {label}
    </button>
  );
};
export default ToggleButton;
