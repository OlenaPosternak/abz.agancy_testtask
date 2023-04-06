import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from './AppBarHeader/AppBarHeader';

export const Layout = () => {

  return (
    <>
      <AppBar/>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
