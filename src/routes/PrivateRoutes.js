import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
    let auth = false;

    return auth ? <Component /> : <Navigate to="/login" />;
};


export default PrivateRoute;