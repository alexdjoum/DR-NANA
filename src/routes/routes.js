import Cart from "../pages/Cart";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RoleBasedRoute from "../RoleBasedRoute";
import {Route} from "react-router";
import PrivateRoute from "./PrivateRoutes";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout";
import Commands from "../pages/Commands";

export const routes = [
    {
        path: "/admin",
        element: <RoleBasedRoute Component={Cart} roles={["admin", "user"]} />
    },
    {
        path: "/user",
        element: <RoleBasedRoute Component={Detail} roles={["user"]} />
    },
    {
        path: "/user",
        element: <PrivateRoute Component={Detail} roles={["admin"]} />
    },

];
export const clientRoutes = [
    {
        path: '/cart',
        component: Cart,
        exact: true,
        protected: false
    },
    {
        path: '/detail/:num',
        component: Detail,
        exact: false,
        protected: false
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        protected: false
    },
    {
        path: '/register',
        component: Register,
        exact: true,
        protected: false
    },
    {
        path: '/',
        component: Home,
        exact: true,
        protected: false
    },
    {
        path: '/shop',
        component: Shop,
        exact: true,
        protected: false
    },
    {
        path: '/checkout',
        component: Checkout,
        exact: true,
        protected: false
    },
    {
        path: '/commands-list',
        component: Commands,
        exact: true,
        protected: false
    }
];

export default clientRoutes;

