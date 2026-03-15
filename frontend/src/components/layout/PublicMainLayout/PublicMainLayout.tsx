import { Outlet } from 'react-router-dom';

export const PublicMainLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-10 pt-20">
      <Outlet />
    </div>
  );
};
