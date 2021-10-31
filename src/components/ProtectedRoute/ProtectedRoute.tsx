import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtectedRoute {
  path: string; 
  redirect?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, redirect, ...rest }) => {
  const isUserAuth = useSelector(
    (state: any) => state.currentSession.isCurrentUserAuth
  );

  const isUserResetPassword = useSelector(
    (state: any) => state.currentSession.isUserResetPassword
  );

  if (redirect) {
    return (
      <Route
        {...rest}
        render={() =>
          isUserResetPassword ? children : <Redirect to="/forgot-password" />
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={() => (isUserAuth ? children : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
