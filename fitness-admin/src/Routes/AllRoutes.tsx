import { lazy } from 'react';


const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/authpages/Dashboard'));
const User = lazy(() => import('../pages/User/Userlist'));

const publicRoutes = [
    { path: "/", component: <Login /> },
    { path: "/login", component: <Login /> },
    // { path: "/dashboard", component: <Dashboard /> },

];

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/user", component: <User /> },

];

export { publicRoutes, authProtectedRoutes };