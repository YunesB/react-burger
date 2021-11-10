import { Route, Redirect } from "react-router-dom";
import { useSelector } from "../../services/hooks";

interface IProtectedRouteAuth {
  path: string;
}

const ProtectedRouteAuth: React.FC<IProtectedRouteAuth> = ({ children, ...rest }) => {

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  return (
    <Route {...rest} render={() => (!isUserAuth ? children : <Redirect to='/' />)} />
  )
};

export default ProtectedRouteAuth;