import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ Component, roles }) => {
    let userRole = "admin";
    return roles.includes(userRole) ? (
        <Component />
    ) : (
        <Navigate to="/unauthorized" />
    );
};

export default RoleBasedRoute;