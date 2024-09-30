import {Navigate, Outlet} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {useAuth} from "../../hooks/useAuth.ts";


export const PrivateRoutes = () =>{

    const {token} = useAuth();

    console.log(token)
    if (!token) return <Navigate to={routes.login} replace/>;

    return <Outlet/>

}