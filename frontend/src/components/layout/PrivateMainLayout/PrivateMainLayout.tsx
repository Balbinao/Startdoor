import { ChevronsLeft } from '@assets/icons';
import { MenuMain } from '@components/ui/MenuMain';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateMainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center gap-4 p-4 pt-10 sm:p-10 sm:pt-20">
      <button
        title="Voltar"
        onClick={() => {
          if (window.history.length > 1) navigate(-1);
        }}
        className="hidden h-fit w-fit cursor-pointer rounded-xl border border-(--grey-900) bg-(--grey-1100) p-2 text-(--grey-300) transition-colors hover:bg-(--grey-900) hover:text-(--grey-200) md:inline"
      >
        <ChevronsLeft width={28} height={28} />
      </button>
      <div className="flex w-full max-w-2xl flex-1 items-center justify-center">
        <Outlet />
        <div className="fixed bottom-3.5 flex w-full justify-center">
          <MenuMain />
        </div>
      </div>
    </div>
  );
};
