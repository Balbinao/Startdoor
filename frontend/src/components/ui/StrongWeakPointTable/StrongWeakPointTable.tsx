import type {
  IStrongWeakPoint,
  IStrongWeakPointItem,
} from '@models/statisticRecommendation.types';

interface Props {
  item: IStrongWeakPoint;
}

interface PointListProps {
  title: string;
  items: IStrongWeakPointItem[];
  valueColor: string;
}

const PointList = ({ title, items, valueColor }: PointListProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className={`${valueColor} w-fit font-bold`}>{title}</h2>

      {items.map((point, index) => (
        <div key={index} className="flex flex-col items-center gap-1.5">
          <span className="text-lg font-semibold text-(--grey-100)">
            {point.competencia}
          </span>

          <span className={`text-lg font-bold ${valueColor}`}>
            {point.percentual}%
          </span>

          <div className="flex flex-col items-center text-sm">
            <span className="font-medium text-(--grey-300)">
              Você: {point.notaEstudante}
            </span>
            <span className="font-medium text-(--grey-300)">
              Empresa: {point.notaEmpresa}
            </span>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="flex flex-1 items-center justify-center pb-12 font-medium text-(--grey-500)">
          Sem dados...
        </div>
      )}
    </div>
  );
};

export const StrongWeakPointTable = ({ item }: Props) => {
  return (
    <div className="w-fit rounded-xl border-2 border-zinc-800 px-3.5 py-5">
      <div className="flex gap-1">
        <PointList
          title="PONTOS FORTES"
          items={item.pontosFortes}
          valueColor="text-green-600"
        />
        <div className="relative flex items-center justify-center">
          <span className="z-5 rounded-md bg-(--grey-1000) p-2.5 text-sm font-extrabold text-(--grey-300)">
            VS
          </span>
          <span className="absolute h-[65%] w-0.75 rounded-xl bg-(--grey-1100)" />
        </div>

        <PointList
          title="PONTOS FRACOS"
          items={item.pontosFracos}
          valueColor="text-rose-700"
        />
      </div>
    </div>
  );
};
