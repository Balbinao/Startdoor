interface Props {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

export const UserAttribute = ({ icon, title, value }: Props) => {
  return (
    <div className="flex w-full gap-2 rounded-lg border border-(--grey-800) bg-(--grey-1000) p-2">
      <div className="shrink-0 text-(--grey-400)">{icon}</div>
      <div className="flex flex-col">
        <span className="text-(--grey-200)">{title}</span>
        <span className="line-clamp-2 font-medium text-(--grey-200)">
          {value}
        </span>
      </div>
    </div>
  );
};
