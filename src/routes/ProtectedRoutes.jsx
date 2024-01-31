import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {

    const isUserAuthenticated = !!localStorage.getItem("AUTH-TOKEN");

    // if(isUserAuthenticated){
    //     return <Outlet/>
    // }
    // else{
    //     navigate('/auth', {replace:true});
    // }

    return isUserAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default ProtectedRoutes;
