import { Outlet } from 'react-router-dom';

export const PrivateMainLayout = () => {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>Área Privada</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
