import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
   const { user , loading } = use(AuthContext);
   const location = useLocation();

   if (loading) {
      return <div className='loading loading-ring loading-xl'>Loading...</div>;
   }


   if (!user) {
      return <Navigate to='/register' state={location.pathname} > </Navigate>
   }

   return children;

};

export default PrivateRoute;