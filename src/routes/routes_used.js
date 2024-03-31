import HomeComplete from "../components/home/HomeComplete";
import Register from "../pages/Register";
import SignIn from "../pages/Login";
import AdminHome from "../admin/components/AdminHome";
import Detail from "../pages/Detail";

import { APP_ROLES } from "../network/auth/Auth";


const routes = [
    // Common Routes
    {
        spaceName: "common",
        secure: false,
        routes: [
            {
                component: <HomeComplete />,
                path: '/',
            },
            {
                component: <HomeSessionDetails />,
                path: '/next-session',
            },
            {
                component: <HomeSessionDetails2 />,
                path: '/next-session2',
            },
            {
                component: <NextSession />,
                path: '/next22',
            },

            {
                component: <CourseDetailsWorpress />,
                path: '/courses-details-check',
            },
            {
                component: <Footer />,
                path: 'footer',
            },
        ]
    },
    // Authentication Routes
    {
        spaceName: "login",
        secure: false,
        routes: [
            {
                component: <Register />,
                path: '/register',
            },
            {
                component: <SignIn />,
                path: '/login',
            }
        ]
    },
    // user Routes
    {
        spaceName: "user",
        secure: true,
        role: APP_ROLES.ROLE_USER,
        routes: [
            {
                component: <Account />,
                path: '/space',

            },
            {
                component: <ChangePassword />,
                path: '/ChangePassword',
            },
            {
                component: <Profile />,
                path: '/profile',
            },
            {
                component: <PaymentCredential />,
                path: '/PaymentCredential',
            },
            // {
            //     component: <Usercourses />,
            //     path: '/mycourses',
            // },
            {
                component: <MySessions />,
                path: '/mysessions',
            },

            {
                component: <Courses />,
                path: '/courses',
            },
            {
                component: <CourseDetails />,
                path: '/courses-details',
            },
            {
                component: <CourseCheckout />,
                path: '/checkout',
            }
        ]
    },

    // Manager Routes
    {
        spaceName: "manager",
        secure: true,
        role: APP_ROLES.ROLE_MANAGER,
        routes: [{
            component: <AdminHome />,
            path: '/admin',
        },
            {
                component: <Session />,
                path: '/sessions',
            },
        ]},

    // Admin Routes
    {
        spaceName: "admin",
        secure: true,
        role: APP_ROLES.ROLE_ADMIN,
        routes: [

            {
                component: <Table />,
                path: '/table',
            },
            {
                component: <SessionManager />,
                path: '/admin-session-manager',
            },


        ]
    },
];
export default routes;