import { ChevronsLeft } from '@assets/icons';
import { MenuMain } from '@components/ui/MenuMain';
import { MenuMainWeb } from '@components/ui/MenuMainWeb';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateMainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center gap-8 p-6">
      <div className="sticky top-6 z-5 hidden w-full justify-center md:flex">
        <MenuMainWeb />
      </div>
      <div className="flex w-full flex-1 justify-center gap-4">
        <button
          title="Voltar"
          onClick={() => {
            if (window.history.length > 1) navigate(-1);
          }}
          className="hidden h-fit w-fit cursor-pointer rounded-xl border border-(--grey-900) bg-(--grey-1100) p-2 text-(--grey-300) transition-colors hover:bg-(--grey-900) hover:text-(--grey-200) md:inline"
        >
          <ChevronsLeft width={28} height={28} />
        </button>
        <div className="flex w-full max-w-2xl flex-1 items-center justify-center pb-24 sm:pb-16">
          <Outlet />
          <div className="fixed bottom-3.5 left-1/2 -translate-x-1/2 md:hidden">
            <MenuMain />
          </div>
        </div>
      </div>
    </div>
  );
};
