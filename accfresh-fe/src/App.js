import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import routes from "./pages/routes";
import Spinner from './components/Spinner';
import PaymentForm from './pages/user/Payment/components/PaymentForm';
import OrderDetails from './pages/user/Order/components/OrderDetails';

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {routes.map(({ component: Component, path, ...rest}) => {
          return (
            <Route key={path} path={path} element={<Component />} {...rest} />
          );
        })}
        <Route key="/payments/:paymentId" path="/payments/:paymentId" element={<PaymentForm />} />
        <Route key="/orders/:orderId" path="/orders/:orderId" element={<OrderDetails />} />
      </Routes>  
    </Suspense>
  );
}

export default App;
