import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ Component, path }) => (
        <Route element={<Component />} path={path} key={path} />
      ))}
      <Route path="/" element={<Navigate to="/posts" />} />
      <Route path="*" element={<Navigate to="/not-found-page" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ Component, path }) => (
        <Route element={<Component />} path={path} key={path} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
