import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Role} from "../models/User.ts";
import {useAuth} from "./AuthContext.tsx";

interface RoleProtectedRouteProps {
    element: React.ReactElement;
    requiredRole: Role;
}

function RoleProtectedRoute({element, requiredRole}: RoleProtectedRouteProps) {
    const {user} = useAuth();
    const [isUserReady, setIsUserReady] = useState(false);

    useEffect(() => {
        if (user != null) {
            setIsUserReady(true)
        }
    }, [user]);

    if (!isUserReady) {
        return <div>Loading ...</div>
    }

    if (!user || !user.hasRole(requiredRole)) {
        return <Navigate to="/"/>;
    }

    return element;
}

export default RoleProtectedRoute;
