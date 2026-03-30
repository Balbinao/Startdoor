import { BriefcaseFilled, Pencil } from '@assets/icons';
import { HINTS_CONTS, ROUTES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import type { IProfessionalExperience } from '@models/experience.types';
import { formatMMMYYYY } from '@utils/formatData';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SupportButton } from '../SupportButton';

interface Props {
  item: IProfessionalExperience;
  onEdit: () => void;
}

export const ProfessionalExperienceCardView = ({ item, onEdit }: Props) => {
  const { id } = useParams();
  const location = useLocation();

  const contentRef = useRef<HTMLDivElement>(null);

  const { getUserId } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState<string>('0px');
  const [shouldCollapse, setShouldCollapse] = useState(false);

  const userId = getUserId();
  const isEditPage =
    !!id &&
    !!userId &&
    location.pathname === ROUTES_CONST.STUDENT.PROFILE_UPDATE(id) &&
    id === userId;

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
          <BriefcaseFilled
            width={36}
            height={36}
            className="text-(--grey-300)"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <span className="text-lg font-semibold">{item.tituloCargo}</span>
          <span className="font-semibold text-(--grey-300)">
            {item.nomeEmpresa}
          </span>
        </div>

        {isEditPage && (
          <div
            title={HINTS_CONTS.EDIT}
            onClick={() => onEdit()}
            className="cursor-pointer p-1 text-(--blue-100) opacity-70 transition-opacity hover:opacity-100"
          >
            <Pencil width={22} height={22} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex justify-between font-semibold text-(--grey-300)">
        <div className="flex gap-3">
          <span>{item.estadoAtuacao}, Brasil</span>
          <span className="text-(--grey-400)">•</span>
          <span>{item.modeloTrabalho}</span>
        </div>

        <div>
          {item.dataInicio && formatMMMYYYY(item.dataInicio)}
          {' - '}
          {item.dataFim ? formatMMMYYYY(item.dataFim) : 'Presente'}
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
