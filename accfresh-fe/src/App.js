import React from 'react';
import { Route, Routes } from "react-router-dom";

import routes from "./pages/routes";

const App = () => {
  return (
    <Routes>
      {routes.map(({ component: Component, path, ...rest}) => {
        return (
          <Route key={path} path={path} element={<Component/>} {...rest} />
        );
      })}
    </Routes>  
  );
}

export default App;
