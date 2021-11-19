import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { getCurrentUser } from '../../services/actions/currentSession';
import AppStyles from '../App/App.module.css';

interface IProtectedRoute {
  path: string; 
  redirect?: boolean;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, redirect, ...rest }) => {

  const isUserAuth = useSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const isUserResetPassword = useSelector(
    (state) => state.currentSession.isUserResetPassword
  );

  const isCurrentUserChecked = useSelector(
    (state) => state.currentSession.currentUserChecked
  );

  const dispatch = useDispatch();
  const init = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getCurrentUser());
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  if (localStorage.getItem("accessToken") && !isCurrentUserChecked) {
    return <div className={`${AppStyles.centeredComponent} text text_type_main-large`}>Загрузка...</div>
  }

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
