import { ChevronsLeft, InfoSquaredRounded } from '@assets/icons';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  modalMessage?: ReactNode;
}

export const PageTitle = ({ title, modalMessage }: Props) => {
  const { modalMessageSafe } = useModalMessageDefault();

  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center rounded-xl bg-(--grey-1100) p-6">
      <button
        title="Voltar"
        onClick={() => {
          if (window.history.length > 1) navigate(-1);
        }}
        className="absolute top-1/2 left-4 h-fit w-fit -translate-y-1/2 cursor-pointer rounded-xl border border-(--grey-900) bg-(--grey-1100) p-2 text-(--grey-300) transition-colors hover:bg-(--grey-900) hover:text-(--grey-200) md:hidden"
      >
        <ChevronsLeft width={28} height={28} />
      </button>

      <span className="block max-w-full truncate text-2xl font-semibold text-(--grey-200)">
        {title}
      </span>

      {modalMessage && (
        <button className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
          <InfoSquaredRounded
            width={28}
            height={28}
            onClick={async () =>
              await modalMessageSafe({
                type: 'info',
                message: modalMessage,
                shouldBlockProcess: false,
                styles: {
                  width: '100%',
                  maxWidth: 672,
                  height: '100%',
                  maxHeight: 576,
                },
              })
            }
            className="text-(--grey-400) transition hover:text-(--blue-100)"
          />
        </button>
      )}
    </div>
  );
};
