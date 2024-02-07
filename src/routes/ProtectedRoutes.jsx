import React, { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {

    const isUserAuthenticated = !!localStorage.getItem("AUTH-TOKEN");

    return isUserAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default ProtectedRoutes;