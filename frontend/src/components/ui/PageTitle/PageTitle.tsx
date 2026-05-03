import { ChevronsLeft } from '@assets/icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
}

export const PageTitle = ({ title }: Props) => {
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
      <span className="text-2xl font-semibold text-(--grey-200)">{title}</span>
    </div>
  );
};
