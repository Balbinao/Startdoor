import {
  Brain,
  Briefcase,
  Building,
  Bulb,
  CalendarEvent,
  Check,
  ChevronUp,
  Coin,
  Heart,
  JigSaw,
  School,
  SpeechBubble,
  StarFilled,
  TrendingUp,
} from '@assets/icons';
import { useReview } from '@hooks/useReview';
import { useState } from 'react';
import { ScoreSubCard } from './ScoreSubCard';

interface Props {
  hasScoreDropdown: boolean;
}

export const ScoreMainCard = ({ hasScoreDropdown }: Props) => {
  const { review } = useReview();

  const [open, setOpen] = useState(false);

  const scores = review
    ? [
        { icon: Briefcase, label: 'Ambiente', value: review.ambiente },
        { icon: School, label: 'Aprendizado', value: review.aprendizado },
        { icon: Heart, label: 'Benefícios', value: review.beneficios },
        { icon: Brain, label: 'Cultura', value: review.cultura },
        { icon: TrendingUp, label: 'Efetivação', value: review.efetivacao },
        { icon: SpeechBubble, label: 'Entrevista', value: review.entrevista },
        { icon: Check, label: 'Feedback', value: review.feedback },
        {
          icon: Building,
          label: 'Infraestrutura',
          value: review.infraestrutura,
        },
        { icon: JigSaw, label: 'Integração', value: review.integracao },
        { icon: Coin, label: 'Remuneração', value: review.remuneracao },
        { icon: CalendarEvent, label: 'Rotina', value: review.rotina },
        { icon: Bulb, label: 'Liderança', value: review.lideranca },
      ]
    : [];

  const avgScore = scores.length
    ? scores.reduce((acc, val) => acc + val.value, 0) / scores.length
    : 0;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex w-fit cursor-pointer items-center gap-4 rounded-lg border border-(--grey-800) bg-(--grey-900) px-3.5 py-2.5"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className="flex items-center gap-2 font-bold text-(--yellow-100)">
          <StarFilled width={20} height={20} className="text-(--yellow-100)" />
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(avgScore)}
        </span>

        <span className="h-full w-0.5 bg-(--grey-600)" />

        {hasScoreDropdown && (
          <ChevronUp
            width={24}
            height={24}
            className={`text-(--grey-200) transition-transform duration-200 ${
              open ? 'rotate-0' : 'rotate-180'
            }`}
          />
        )}
      </div>

      {open && (
        <div className="flex flex-wrap gap-4">
          {scores.map((item, index) => {
            return (
              <ScoreSubCard
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
