import type { ICompany } from '@models/companyData.types';
import type { IConditionalScore } from '@models/studentData.types';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  type ChartDataset,
  type ChartOptions,
  type TooltipItem,
} from 'chart.js';
import { useState } from 'react';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type RadarDataset = ChartDataset<'radar', (number | null)[]>;

interface Props {
  firstCompany: ICompany | null;
  secondCompany: ICompany | null;
  studentConditionalScore: IConditionalScore | null;
}

type VisibilityState = {
  first: boolean;
  second: boolean;
  third: boolean;
};

const LABELS = [
  'Ambiente',
  'Aprendizado',
  'Benefícios',
  'Cultura',
  'Efetivação',
  'Entrevista',
  'Feedback',
  'Infraestrutura',
  'Integração',
  'Remuneração',
  'Rotina',
  'Liderança',
];

const DATA_KEYS = [
  'ambiente',
  'aprendizado',
  'beneficios',
  'cultura',
  'efetivacao',
  'entrevista',
  'feedback',
  'infraestrutura',
  'integracao',
  'remuneracao',
  'rotina',
  'lideranca',
] as const;

type DataKey = (typeof DATA_KEYS)[number];
type ScoreShape = Record<DataKey, number>;

const COLORS = {
  first: 'rgba(56, 189, 248, 1)',
  second: 'rgba(168, 85, 247, 1)',
  third: 'rgba(249, 115, 22, 1)',
};

const createDataset = (
  label: string,
  data: (number | null)[],
  color: string,
): RadarDataset => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color.replace('1)', '0.2)'),
  pointBackgroundColor: color,
  borderWidth: 2,
  pointRadius: 3,
  pointHoverRadius: 7,
  fill: true,
  tension: 0.3,
});

// const extractValues = (
//   source: Partial<ScoreShape> | null,
// ): (number | null)[] => {
//   if (!source) return [];
//   return DATA_KEYS.map(key => {
//     const value = source[key] ?? 0;
//     return value === 0 ? null : value;
//   });
// };

const extractValues = (source: Partial<ScoreShape> | null): number[] => {
  if (!source) return [];
  return DATA_KEYS.map(key => source[key] ?? 0);
};

const mapCompanyMedias = (
  medias: ICompany['medias'] | null | undefined,
): Partial<ScoreShape> | null => {
  if (!medias) return null;

  return {
    ambiente: medias.mediaAmbiente,
    aprendizado: medias.mediaAprendizado,
    beneficios: medias.mediaBeneficios,
    cultura: medias.mediaCultura,
    efetivacao: medias.mediaEfetivacao,
    entrevista: medias.mediaEntrevista,
    feedback: medias.mediaFeedback,
    infraestrutura: medias.mediaInfraestrutura,
    integracao: medias.mediaIntegracao,
    remuneracao: medias.mediaRemuneracao,
    rotina: medias.mediaRotina,
    lideranca: medias.mediaLideranca,
  };
};

const LegendBadges = ({
  items,
  visibility,
  onToggle,
}: {
  items: { key: keyof VisibilityState; label?: string; color: string }[];
  visibility: VisibilityState;
  onToggle: (key: keyof VisibilityState) => void;
}) => (
  <div className="flex justify-center gap-3">
    {items.map(
      ({ key, label, color }) =>
        label && (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            className={`flex max-w-36 items-center gap-2 overflow-hidden rounded-full border border-(--grey-800) bg-(--grey-1000) px-5 py-2 text-sm text-(--grey-200) transition md:max-w-56 ${
              !visibility[key] && 'opacity-40'
            }`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="truncate">{label}</span>
          </button>
        ),
    )}
  </div>
);

export const CompanyStatisticsChart = ({
  firstCompany,
  secondCompany,
  studentConditionalScore,
}: Props) => {
  const [visibility, setVisibility] = useState<VisibilityState>({
    first: true,
    second: true,
    third: true,
  });

  const sources = [
    {
      key: 'first' as const,
      label: firstCompany?.nomeFantasia,
      data: extractValues(mapCompanyMedias(firstCompany?.medias)),
      color: COLORS.first,
      visible: visibility.first,
    },
    {
      key: 'second' as const,
      label: secondCompany?.nomeFantasia,
      data: extractValues(mapCompanyMedias(secondCompany?.medias)),
      color: COLORS.second,
      visible: visibility.second,
    },
    {
      key: 'third' as const,
      label: 'Desejado',
      data: extractValues(studentConditionalScore),
      color: COLORS.third,
      visible: visibility.third,
    },
  ];

  const datasets: RadarDataset[] = sources
    .filter(s => s.label && s.visible)
    .map(s => createDataset(s.label ?? 'Label', s.data, s.color));

  const data = {
    labels: LABELS,
    datasets,
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 5,
        grid: { color: '#27272a' },
        angleLines: { color: '#3f3f46' },
        pointLabels: {
          color: '#71717a',
          font: { size: 12 },
        },
        ticks: {
          color: '#a1a1aa',
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#18181b',
        titleColor: '#fafafa',
        bodyColor: '#d4d4d8',
        borderColor: '#3f3f46',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        boxPadding: 8,
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        callbacks: {
          title: (items: TooltipItem<'radar'>[]) => items[0].label ?? '',
          label: (ctx: TooltipItem<'radar'>) =>
            ctx.raw == null
              ? ''
              : `${ctx.dataset.label}: ${ctx.formattedValue}`,
        },
      },
    },
    devicePixelRatio: 4,
  };

  const toggleVisibility = (key: keyof VisibilityState) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-8">
      <LegendBadges
        items={sources.map(({ key, label, color }) => ({
          key,
          label,
          color,
        }))}
        visibility={visibility}
        onToggle={toggleVisibility}
      />

      <div className="h-75 md:h-100 lg:h-125">
        <Radar style={{ maxWidth: '100%' }} data={data} options={options} />
      </div>
    </div>
  );
};
