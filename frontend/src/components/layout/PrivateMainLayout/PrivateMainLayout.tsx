import { Outlet } from 'react-router-dom';

export const PrivateMainLayout = () => {
  return (
    <div className="flex min-h-screen justify-center p-4 pt-10 sm:p-10 sm:pt-20">
      <div className="flex w-full max-w-2xl flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
