interface ScoreSubCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

export const ScoreSubCard = ({
  icon: Icon,
  label,
  value,
}: ScoreSubCardProps) => {
  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3.5 py-2.5">
      <div className="flex gap-2">
        <Icon
          width={22}
          height={22}
          strokeWidth={1.6}
          className="text-(--grey-300)"
        />
        <span className="text-sm font-normal text-(--grey-200)">{label}</span>
      </div>

      <span className="h-full w-0.5 bg-(--grey-600)" />

      <span className="font-medium text-(--yellow-100)">{value}</span>
    </div>
  );
};
