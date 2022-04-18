const TopBar = ({ title }: { title: string }) => {
  return <h1 className="text-center fixed py-3 top-0 bg-kWhiteDark font-bold text-kBlue w-full">{title}</h1>;
};

export default TopBar;
