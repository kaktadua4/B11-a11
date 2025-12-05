import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
   const { user } = use(AuthContext);
   const location = useLocation();
console.log(location.pathname);


   if (!user) {
      return <Navigate to='/register' state={location.pathname} > </Navigate>
   }

   return children;

};

export default PrivateRoute;