import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import routes from "./pages/routes";
import Spinner from './components/Spinner';
import PaymentForm from './pages/user/Payment/components/PaymentForm';
import OrderDetails from './pages/user/Order/components/OrderDetails';
import ImportForm from './pages/admin/Accounts/components/ImportForm';
import UserDetails from './pages/admin/Users/components/UserDetails';

const App = () => {
  return (
    // <Suspense fallback={<Spinner />}>
    //   <Routes>
    //     {routes.map(({ component: Component, path, ...rest}) => {
    //       return (
    //         <Route key={path} path={path} element={<Component />} {...rest} />
    //       );
    //     })}
    //     <Route key="/payments/:paymentId" path="/payments/:paymentId" element={<PaymentForm />} />
    //     <Route key="/orders/:orderId" path="/orders/:orderId" element={<OrderDetails />} />
    //     <Route key="/admin/accounts/import" path="/admin/accounts/import" element={<ImportForm />} />
    //     <Route key="/admin/users/:userId" path="/admin/users/:userId" element={<UserDetails />} />
    //   </Routes>  
    // </Suspense>
    <h1 style={{textAlign: 'center', verticalAlign: 'middle', marginTop: '20%', color: '#fff'}}>Thank You for used my service</h1>
  );
}

export default App;
