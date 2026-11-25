
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const isInitialized = useSelector(
        (state: RootState) => state.auth.isInitialized
    );

    const location = useLocation();

    if (!isInitialized) {
        return <div role="status" aria-live="polite">Checking your session...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
