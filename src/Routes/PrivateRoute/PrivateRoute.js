import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoute = ({children}) => {

    const { user,loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="w-16 h-16 border-4 border-dashed rounded-full mx-auto mt-64 animate-spin dark:border-gray-800" ></div>
    }
    
    if(user){
        return children;
    } 
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default PrivateRoute;