interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

export const UserAttribute = ({ icon, title, value }: Props) => {
  return (
    <div className="flex w-full gap-2 items-center rounded-lg border-2 border-(--grey-800) py-2 pr-3 pl-1.5">
      <div className="shrink-0 text-(--grey-400)">{icon}</div>
      <div className="flex flex-col">
        <span className="text-(--grey-200)">{title}</span>
        <span className="font-bold text-(--grey-200)">{value}</span>
      </div>
    </div>
  );
};
