import { Outlet } from 'react-router-dom';

import { Header } from '~/containers/Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
