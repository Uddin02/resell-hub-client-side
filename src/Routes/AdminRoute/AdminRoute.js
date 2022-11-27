import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({children}) => {

    const { user,loading, logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if(loading || isAdminLoading){
        return <div className="w-16 h-16 border-4 border-dashed rounded-full mx-auto mt-64 animate-spin dark:border-gray-800" ></div>
    }
    
    if(user && isAdmin){
        return children;
    }
    logOut()
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;