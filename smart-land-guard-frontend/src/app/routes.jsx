import React, { lazy } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

// Lazy load pages
const Landing = lazy(() => import('../pages/landing/Landing'));
const Auth = lazy(() => import('../pages/auth/Auth'));
const UserDashboard = lazy(() => import('../pages/dashboard/UserDashboard'));
const OfficerDashboard = lazy(() => import('../pages/dashboard/OfficerDashboard'));
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const LakeDetails = lazy(() => import('../pages/lake/LakeDetails'));
const AboutTeam = lazy(() => import('../pages/about/AboutTeam'));

// Role Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
        if (user.role === 'officer') return <Navigate to="/officer-dashboard" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export const routes = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute allowedRoles={['public']}>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/lake/:id", // Assuming dynamic routing for lake details later
        element: (
            <ProtectedRoute allowedRoles={['public', 'officer', 'admin']}>
                <LakeDetails />
            </ProtectedRoute>
        ),
    },
    // Legacy route support if needed, or direct mapping
    {
        path: "/lake-details",
        element: (
            <ProtectedRoute allowedRoles={['public', 'officer', 'admin']}>
                <LakeDetails />
            </ProtectedRoute>
        ),
    },
    {
        path: "/officer-dashboard",
        element: (
            <ProtectedRoute allowedRoles={['officer']}>
                <OfficerDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin-dashboard",
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/about",
        element: <AboutTeam />,
    },
    // Redirects
    {
        path: "/user-dashboard",
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    }
];
