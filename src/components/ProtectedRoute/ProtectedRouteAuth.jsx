import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteAuth = ({ children, ...rest }) => {

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  return (
    <Route {...rest} render={() => (!isUserAuth ? children : <Redirect to='/' />)} />
  )
};

export default ProtectedRouteAuth;