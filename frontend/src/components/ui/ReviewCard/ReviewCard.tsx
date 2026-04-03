import {
  BriefcaseFilled,
  MessageCircleFilled,
  ShieldFilled,
  StarFilled,
  UserFilled,
} from '@assets/icons';
import type { IReviewCard } from '@models/review.types';
import { formatDDMMMYYYY } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';

interface Props {
  item: IReviewCard;
}

export const ReviewCard = ({ item }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [height, setHeight] = useState<string>('0px');

  const lineHeight = 32;
  const maxLines = 3;
  const collapsedHeight = lineHeight * maxLines;

  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      setHeight(`${fullHeight}px`);
      setShouldCollapse(fullHeight > collapsedHeight);
    }
  }, [item.textoAvaliacao, collapsedHeight]);

  return (
    <div className="relative flex w-full cursor-pointer flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1000) p-3">
      <div className="flex items-start gap-3">
        <div className="w-fit rounded-lg bg-(--grey-800) p-3">
          {item.source === 'Estudante' && (
            <BriefcaseFilled
              width={36}
              height={36}
              className="text-(--grey-300)"
            />
          )}
          {item.source === 'Empresa' && (
            <UserFilled
              width={36}
              height={36}
              className="text-(--grey-300)"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-1 justify-between">
            {item.source === 'Estudante' && (
              <span className="text-lg font-semibold">{item.nomeEmpresa}</span>
            )}

            {item.source === 'Empresa' && (
              <span className="text-lg font-semibold">
                {item.nomeEstudante}
              </span>
            )}

            <span className="text-(--grey-400)">
              {formatDDMMMYYYY(item.dataPublicacao)}
            </span>
          </div>
          <div className="flex gap-3 font-semibold text-(--grey-300)">
            <span>{item.tituloCargo}</span>
            <span className="text-(--grey-400)">•</span>
            <span className="flex items-center gap-1.5">
              {item.notaMedia}
              <StarFilled
                width={15}
                height={15}
                className="text-(--yellow-100) opacity-80"
              />
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          style={{
            height: !shouldCollapse ? height : `${collapsedHeight}px`,
          }}
          className="line-clamp-3 overflow-hidden leading-8 transition-[height] duration-300 ease-in-out"
        >
          {item.textoAvaliacao}
        </div>

        {shouldCollapse && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-25 w-full bg-linear-to-t from-(--grey-1000) to-transparent" />
        )}
      </div>

      <div className="absolute right-3 bottom-3 flex gap-4 rounded-md border border-(--grey-500) bg-(--grey-900) px-3 py-1.5">
        <span className="flex items-center gap-1">
          <MessageCircleFilled
            width={18}
            height={18}
            className="text-(--blue-100)"
          />
          {item.numApoios}
        </span>
        <span className="flex items-center gap-1">
          <ShieldFilled width={18} height={18} className="text-(--blue-100)" />
          {item.numComents}
        </span>
      </div>
    </div>
  );
};
