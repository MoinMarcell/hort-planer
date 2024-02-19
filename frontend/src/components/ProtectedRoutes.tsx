import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    isLoggedIn: boolean,
}
export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {
    return props.isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>;
}