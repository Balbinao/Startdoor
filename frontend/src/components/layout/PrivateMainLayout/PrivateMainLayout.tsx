import { Outlet } from 'react-router-dom';

export const PrivateMainLayout = () => {
  return (
    <div className="flex min-h-screen justify-center p-10 pt-20">
      <div className="flex w-full max-w-5xl flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
