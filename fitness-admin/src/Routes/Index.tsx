import { Fragment, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./AllRoutes";
import Loader from "../components/Loader/Loader";
import { AuthProtected } from "./AuthProtected";
import Layout from "../components/Layout/Layout";

const Index = () => {

    return (
        <Fragment>
            <Routes>
                {/* HERE WE DEFINE ALL PUBLIC ROUTES */}
                {publicRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <Suspense>
                                {route.component}
                            </Suspense>
                        }
                        key={idx}
                    />
                ))}

                {authProtectedRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <Suspense fallback={<><Loader show={true} /></>}>
                                <AuthProtected >
                                    <Layout component={route.component} />
                                </AuthProtected>
                            </Suspense>
                        }
                        key={idx}
                    // exact={true}
                    >
                    </Route>
                ))}
            </Routes>
        </Fragment>
    );
}

export default Index;