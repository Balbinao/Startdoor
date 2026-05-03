interface TitleDivisorProps {
  title: string;
}

export const TitleDivisor = ({ title }: TitleDivisorProps) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="h-px flex-1 bg-(--grey-900)" />
      <span className="text-lg font-medium whitespace-nowrap text-(--grey-400)">
        {title}
      </span>
      <div className="h-px flex-1 bg-(--grey-900)" />
    </div>
  );
};
