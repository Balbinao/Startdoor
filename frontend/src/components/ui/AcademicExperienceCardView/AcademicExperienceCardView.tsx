import { Pencil, SchoolFilled } from '@assets/icons';
import { HINTS_CONTS } from '@constants';
import type { IAcademicExperience } from '@models/experience.types';
import { formatMMMYYYY } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { SupportButton } from '../SupportButton';

interface Props {
  item: IAcademicExperience;
  onEdit: () => void;
}

export const AcademicExperienceCardView = ({ item, onEdit }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<string>('0px');
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const lineHeight = 32;
  const maxLines = 3;
  const collapsedHeight = lineHeight * maxLines;

  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      setHeight(`${fullHeight}px`);
      setShouldCollapse(fullHeight > collapsedHeight);
    }
  }, [item.descricao, collapsedHeight]);

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-(--grey-800) bg-(--grey-1000) p-3">
      <div className="flex items-start gap-3">
        <div className="w-fit rounded-lg bg-(--grey-800) p-3">
          <SchoolFilled width={36} height={36} className="text-(--grey-300)" />
        </div>

        <div className="flex flex-1 flex-col">
          <span className="text-lg font-semibold">{item.tituloEnsino}</span>
          <span className="font-semibold text-(--grey-300)">
            {item.nomeEscola}
          </span>
        </div>

        <div
          title={HINTS_CONTS.EDIT}
          onClick={() => onEdit()}
          className="cursor-pointer p-1 text-(--blue-100) opacity-70 transition-opacity hover:opacity-100"
        >
          <Pencil width={22} height={22} strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex justify-between font-semibold text-(--grey-300)">
        <div className="flex gap-3">
          <span>{item.estadoAtuacao}, Brasil</span>
          <span className="text-(--grey-400)">•</span>
          <span>{item.modeloEnsino}</span>
        </div>

        <div>
          {item.dataInicio && formatMMMYYYY(item.dataInicio)}
          {item.dataFim && (
            <>
              {' - '}
              {formatMMMYYYY(item.dataFim)}
            </>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          style={{
            height:
              isExpanded || !shouldCollapse ? height : `${collapsedHeight}px`,
          }}
          className="overflow-hidden leading-8 transition-[height] duration-300 ease-in-out"
        >
          {item.descricao}
        </div>

        {!isExpanded && shouldCollapse && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-25 w-full bg-linear-to-t from-(--grey-1000) to-transparent" />
        )}
      </div>

      {shouldCollapse && (
        <div
          title={isExpanded ? HINTS_CONTS.COLLAPSE : HINTS_CONTS.EXPAND}
          className="flex justify-end"
        >
          <SupportButton
            text={isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
            onClick={() => setIsExpanded(prev => !prev)}
          />
        </div>
      )}
    </div>
  );
};
