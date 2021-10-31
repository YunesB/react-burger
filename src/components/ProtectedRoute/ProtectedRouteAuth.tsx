import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtectedRouteAuth {
  path: string;
}

const ProtectedRouteAuth: React.FC<IProtectedRouteAuth> = ({ children, ...rest }) => {

  const isUserAuth = useSelector(
    (state: any) => state.currentSession.isCurrentUserAuth
  );

  return (
    <Route {...rest} render={() => (!isUserAuth ? children : <Redirect to='/' />)} />
  )
};

export default ProtectedRouteAuth;