import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import routes from "./pages/routes";
import Spinner from './components/Layout/Spinner';

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {routes.map(({ component: Component, path, ...rest}) => {
          return (
            <Route key={path} path={path} element={<Component />} {...rest} />
          );
        })}
      </Routes>  
    </Suspense>
  );
}

export default App;
