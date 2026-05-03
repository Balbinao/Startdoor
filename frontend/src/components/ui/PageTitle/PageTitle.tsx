interface Props {
  title: string;
}

export const PageTitle = ({ title }: Props) => {
  return (
    <div className="flex justify-center rounded-xl bg-(--grey-1100) p-6">
      <span className="text-2xl font-semibold text-(--grey-200)">{title}</span>
    </div>
  );
};
